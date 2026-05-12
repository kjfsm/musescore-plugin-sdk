export interface PropertyDecl {
  name: string;
  cppType: string;
  readOnly: boolean;
}

// API_PROPERTY(name, KEY) / API_PROPERTY_READ_ONLY(name, KEY) で明示的な型がない場合の
// QVariant ペイロードの既知の具体型マッピング。
const KNOWN_VARIANT_PROP_TYPES: Readonly<Record<string, string>> = {
  timesigNominal: "FractionWrapper*",
  timesigActual: "FractionWrapper*",
  timesig: "FractionWrapper*",
  timesigStretch: "FractionWrapper*",
  tempo: "qreal",
  barlineType: "int",
  barlineSpan: "bool",
  barlineSpanFrom: "int",
  barlineSpanTo: "int",
  dynamicType: "int",
  concertClefType: "int",
  transposingClefType: "int",
  concertKey: "int",
  actualKey: "int",
  repeatCount: "int",
  velocity: "int",
  userVelocity: "int",
  repeatStart: "bool",
  repeatEnd: "bool",
  repeatJump: "bool",
  irregular: "bool",
  breakMmr: "bool",
  staffBarlineSpan: "int",
  staffBarlineSpanFrom: "int",
  staffBarlineSpanTo: "int",
  staffInvisible: "bool",
  measureNumberMode: "int",
  noOffset: "int",
  userStretch: "qreal",
  bracketSpan: "int",
  bracketColumn: "int",
  systemBracket: "int",
  numberType: "int",
  bracketType: "int",
  actualNotes: "int",
  normalNotes: "int",
  staffMove: "int",
};

export interface MethodParam {
  name: string;
  cppType: string;
}

export interface MethodDecl {
  name: string;
  cppType: string;
  params: MethodParam[];
}

export interface EnumMember {
  name: string;
  value?: string;
}

export interface EnumDecl {
  name: string;
  members: EnumMember[];
}

export interface ClassDecl {
  name: string;
  baseClass: string | null;
  properties: PropertyDecl[];
  methods: MethodDecl[];
  enums: EnumDecl[];
}

export interface ParseResult {
  classes: ClassDecl[];
  enums: EnumDecl[];
}

export function parseHeader(source: string): ParseResult {
  const stripped = stripCommentsAndStrings(source);
  const classes: ClassDecl[] = [];
  const topLevelEnums: EnumDecl[] = [];

  const classRe =
    /\bclass\s+([A-Z]\w*)(?:\s*:\s*(?:public|protected|private)\s+([\w:]+(?:<[^>]+>)?)[^{]*)?\s*\{/g;
  while (true) {
    const m = classRe.exec(stripped);
    if (m === null) break;
    if (precededByEnum(stripped, m.index)) {
      classRe.lastIndex = m.index + m[0].length;
      continue;
    }
    const name = m[1] ?? "";
    const rawBase = m[2] ?? null;
    const bodyStart = m.index + m[0].length;
    const bodyEnd = findMatchingBrace(stripped, bodyStart - 1);
    if (bodyEnd < 0) continue;
    const body = stripped.slice(bodyStart, bodyEnd);
    const baseClass = rawBase ? simplifyTypeText(rawBase) : null;
    classes.push({
      name,
      baseClass,
      properties: extractQProperties(body),
      methods: extractInvokableMethods(body),
      enums: extractInlineEnums(body),
    });
    classRe.lastIndex = bodyEnd + 1;
  }

  // クラスの外側にある自立した enum（例: enums.h）
  // `(?::\s*[\w\s]+?)?` で `: unsigned char` のような複数単語の基底型にも対応する。
  const enumRe = /\benum(?:\s+class)?\s+(\w+)\s*(?::\s*[\w\s]+?)?\s*\{/g;
  while (true) {
    const m = enumRe.exec(stripped);
    if (m === null) break;
    const start = m.index;
    if (isInsideAnyClass(start, classes, stripped)) continue;
    const enName = m[1] ?? "";
    const bodyStart = m.index + m[0].length;
    const bodyEnd = findMatchingBrace(stripped, bodyStart - 1);
    if (bodyEnd < 0) continue;
    const body = stripped.slice(bodyStart, bodyEnd);
    topLevelEnums.push({ name: enName, members: parseEnumBody(body) });
  }

  return { classes, enums: topLevelEnums };
}

function isInsideAnyClass(offset: number, _classes: ClassDecl[], source: string): boolean {
  const re =
    /\bclass\s+([A-Z]\w*)(?:\s*:\s*(?:public|protected|private)\s+[\w:]+(?:<[^>]+>)?[^{]*)?\s*\{/g;
  while (true) {
    const m = re.exec(source);
    if (m === null) break;
    if (precededByEnum(source, m.index)) {
      re.lastIndex = m.index + m[0].length;
      continue;
    }
    const start = m.index;
    const bodyStart = start + m[0].length;
    const bodyEnd = findMatchingBrace(source, bodyStart - 1);
    if (bodyEnd < 0) continue;
    if (offset > bodyStart && offset < bodyEnd) return true;
    re.lastIndex = bodyEnd;
  }
  return false;
}

function precededByEnum(s: string, classKeywordIdx: number): boolean {
  let i = classKeywordIdx - 1;
  while (i >= 0 && /\s/.test(s[i] ?? "")) i--;
  if (i < 3) return false;
  return s.slice(i - 3, i + 1) === "enum";
}

function findMatchingBrace(s: string, openIdx: number): number {
  if (s[openIdx] !== "{") return -1;
  let depth = 0;
  for (let i = openIdx; i < s.length; i++) {
    const ch = s[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function extractQProperties(body: string): PropertyDecl[] {
  const out: PropertyDecl[] = [];

  // 標準の Q_PROPERTY(type name READ getter [WRITE setter] ...)
  for (const m of body.matchAll(/\bQ_PROPERTY\s*\(([\s\S]*?)\)/g)) {
    const inner = m[1] ?? "";
    const tokens = tokenizePropertyArgs(inner);
    if (tokens.length < 2) continue;
    const readIdx = tokens.findIndex((t) => t === "READ");
    if (readIdx < 1) continue;
    const name = tokens[readIdx - 1];
    if (!name) continue;
    const cppType = tokens
      .slice(0, readIdx - 1)
      .join(" ")
      .trim();
    if (!cppType) continue;
    const writeIdx = tokens.indexOf("WRITE");
    out.push({ name, cppType, readOnly: writeIdx < 0 });
  }

  // API_PROPERTY_READ_ONLY_T(type, name, KEY) — _T 版を先にマッチさせる
  for (const m of body.matchAll(
    /\bAPI_PROPERTY_READ_ONLY_T\s*\(\s*([\w:*]+)\s*,\s*(\w+)\s*,\s*\w+\s*\)/g,
  )) {
    const cppType = (m[1] ?? "").trim();
    const name = (m[2] ?? "").trim();
    if (name && cppType) out.push({ name, cppType, readOnly: true });
  }

  // API_PROPERTY_T(type, name, KEY)
  for (const m of body.matchAll(/\bAPI_PROPERTY_T\s*\(\s*([\w:*]+)\s*,\s*(\w+)\s*,\s*\w+\s*\)/g)) {
    const cppType = (m[1] ?? "").trim();
    const name = (m[2] ?? "").trim();
    if (name && cppType) out.push({ name, cppType, readOnly: false });
  }

  // API_PROPERTY_READ_ONLY(name, KEY) — 型なし版は KNOWN_VARIANT_PROP_TYPES で解決
  for (const m of body.matchAll(/\bAPI_PROPERTY_READ_ONLY\s*\(\s*(\w+)\s*,\s*\w+\s*\)/g)) {
    const name = (m[1] ?? "").trim();
    if (!name) continue;
    const cppType = KNOWN_VARIANT_PROP_TYPES[name] ?? "QVariant";
    out.push({ name, cppType, readOnly: true });
  }

  // API_PROPERTY(name, KEY) — 型なし版
  for (const m of body.matchAll(/\bAPI_PROPERTY\s*\(\s*(\w+)\s*,\s*\w+\s*\)/g)) {
    const name = (m[1] ?? "").trim();
    if (!name) continue;
    const cppType = KNOWN_VARIANT_PROP_TYPES[name] ?? "QVariant";
    out.push({ name, cppType, readOnly: false });
  }

  return out;
}

function extractInvokableMethods(body: string): MethodDecl[] {
  const out: MethodDecl[] = [];
  const marker = /\bQ_INVOKABLE\b/g;
  while (true) {
    const m = marker.exec(body);
    if (m === null) break;
    const sigStart = m.index + m[0].length;
    const end = findDeclarationEnd(body, sigStart);
    if (end < 0) continue;
    const sig = body.slice(sigStart, end).trim();
    marker.lastIndex = end + 1;
    const parsed = parseMethodSignature(sig);
    if (parsed) out.push(parsed);
  }
  return out;
}

// `from` から始まるメンバ宣言の終端のバイトインデックスを返す。
// 深さ 0 のところで最初に現れた `;` か `{`（インライン定義）のいずれか。
function findDeclarationEnd(s: string, from: number): number {
  let depth = 0;
  for (let i = from; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(" || ch === "<") depth++;
    else if (ch === ")" || ch === ">") depth--;
    else if (depth === 0 && (ch === ";" || ch === "{")) return i;
  }
  return -1;
}

function parseMethodSignature(sig: string): MethodDecl | null {
  const m = /^([\s\S]+?)\s+(\w+)\s*\(([\s\S]*)\)\s*(?:const)?\s*$/.exec(sig);
  if (!m) return null;
  const cppType = (m[1] ?? "").trim();
  const name = m[2] ?? "";
  const paramsRaw = (m[3] ?? "").trim();
  if (!cppType || !name) return null;
  return { name, cppType, params: parseParams(paramsRaw) };
}

function extractInlineEnums(body: string): EnumDecl[] {
  const out: EnumDecl[] = [];
  const re = /\benum(?:\s+class)?\s+(\w+)\s*(?::\s*[\w\s]+?)?\s*\{/g;
  while (true) {
    const m = re.exec(body);
    if (m === null) break;
    const name = m[1] ?? "";
    const bodyStart = m.index + m[0].length;
    const bodyEnd = findMatchingBrace(body, bodyStart - 1);
    if (bodyEnd < 0) continue;
    out.push({ name, members: parseEnumBody(body.slice(bodyStart, bodyEnd)) });
    re.lastIndex = bodyEnd;
  }
  return out;
}

function parseEnumBody(body: string): EnumMember[] {
  const out: EnumMember[] = [];
  for (const raw of body.split(",")) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) {
      const name = /^[A-Za-z_]\w*/.exec(trimmed)?.[0];
      if (name) out.push({ name });
    } else {
      const name = /^[A-Za-z_]\w*/.exec(trimmed.slice(0, eq))?.[0];
      const value = trimmed.slice(eq + 1).trim();
      if (name) out.push({ name, value });
    }
  }
  return out;
}

function tokenizePropertyArgs(s: string): string[] {
  const tokens: string[] = [];
  let buf = "";
  let depth = 0;
  for (const ch of s) {
    if (ch === "<" || ch === "(") depth++;
    if (ch === ">" || ch === ")") depth--;
    if (/\s/.test(ch) && depth === 0) {
      if (buf) {
        tokens.push(buf);
        buf = "";
      }
    } else {
      buf += ch;
    }
  }
  if (buf) tokens.push(buf);
  return tokens;
}

function parseParams(raw: string): MethodParam[] {
  if (raw === "" || raw === "void") return [];
  const parts: string[] = [];
  let depth = 0;
  let buf = "";
  for (const ch of raw) {
    if (ch === "<" || ch === "(") depth++;
    if (ch === ">" || ch === ")") depth--;
    if (ch === "," && depth === 0) {
      parts.push(buf.trim());
      buf = "";
    } else {
      buf += ch;
    }
  }
  if (buf.trim()) parts.push(buf.trim());

  const out: MethodParam[] = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i] ?? "";
    const cleaned = p.replace(/=.+$/, "").trim();
    const tokens = cleaned.split(/\s+/);
    const last = tokens.at(-1) ?? "";
    let name = `arg${i}`;
    let cppType = cleaned;
    const idMatch = /^(\*+)?(\w+)$/.exec(last);
    if (idMatch && tokens.length > 1) {
      const ident = idMatch[2];
      if (ident && !/^(const|volatile|unsigned|signed)$/.test(ident)) {
        name = ident;
        const ptrPrefix = idMatch[1] ?? "";
        cppType = `${tokens.slice(0, -1).join(" ")}${ptrPrefix}`.trim();
      }
    }
    out.push({ name, cppType });
  }
  return out;
}

function stripCommentsAndStrings(source: string): string {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];
    if (ch === "/" && next === "/") {
      while (i < source.length && source[i] !== "\n") {
        out += " ";
        i++;
      }
      continue;
    }
    if (ch === "/" && next === "*") {
      out += "  ";
      i += 2;
      while (i < source.length && !(source[i] === "*" && source[i + 1] === "/")) {
        out += source[i] === "\n" ? "\n" : " ";
        i++;
      }
      if (i < source.length) {
        out += "  ";
        i += 2;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      const quote = ch;
      out += " ";
      i++;
      while (i < source.length && source[i] !== quote) {
        if (source[i] === "\\" && i + 1 < source.length) {
          out += "  ";
          i += 2;
          continue;
        }
        out += source[i] === "\n" ? "\n" : " ";
        i++;
      }
      if (i < source.length) {
        out += " ";
        i++;
      }
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}

function simplifyTypeText(s: string): string {
  return s
    .replace(/^.*::/, "")
    .replace(/<[^>]*>$/, "")
    .trim();
}
