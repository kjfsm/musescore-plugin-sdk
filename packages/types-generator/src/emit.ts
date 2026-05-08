import { mapType } from "./map-types.js";
import type { ClassDecl, EnumDecl, ParseResult } from "./parse.js";

export interface EmitInput {
  perFile: { path: string; result: ParseResult }[];
}

export interface EmitOutput {
  pluginApi: string;
  enums: string;
  warnings: string[];
}

const HEADER = `// @kjfsm/musescore-plugin-sdk-types-generator が自動生成したファイル。手で編集しないこと。
// 再生成するにはリポジトリのルートで \`pnpm generate:types\` を実行する。
`;

// Plugin API には含まれないが、プロパティやメソッドの型として登場する Qt のジオメトリ型。
const QT_TYPE_ALIASES: Record<string, string> = {
  QPointF: "{ x: number; y: number }",
  QPoint: "{ x: number; y: number }",
  QRectF: "{ x: number; y: number; width: number; height: number }",
  QRect: "{ x: number; y: number; width: number; height: number }",
  QSizeF: "{ width: number; height: number }",
  QSize: "{ width: number; height: number }",
  QColor: "string",
  QDate: "string",
  QTime: "string",
  QDateTime: "string",
  QUrl: "string",
};

const BUILTIN_TS_TYPES = new Set(["number", "boolean", "string", "void", "unknown", "null"]);

export function emit(input: EmitInput): EmitOutput {
  const allClasses: ClassDecl[] = [];
  const allEnums: EnumDecl[] = [];
  const warnings: string[] = [];

  for (const f of input.perFile) {
    for (const cls of f.result.classes) allClasses.push(cls);
    for (const en of f.result.enums) allEnums.push(en);
    for (const cls of f.result.classes) {
      for (const en of cls.enums) allEnums.push(en);
    }
  }

  const dedupedClasses = dedupeClasses(allClasses);
  const dedupedEnums = dedupeEnums(allEnums);
  const knownClasses = new Set(dedupedClasses.map((c) => c.name));
  const knownEnumNames = new Set(dedupedEnums.map((e) => e.name));
  const referencedTypes = new Set<string>();

  const inheritedMembers = computeInheritedMembers(dedupedClasses);

  const pluginApiLines: string[] = [];
  pluginApiLines.push(HEADER);
  pluginApiLines.push("");
  if (dedupedEnums.length > 0) {
    pluginApiLines.push(
      `import type { ${[...knownEnumNames].sort().join(", ")} } from "./enums.js";`,
    );
    pluginApiLines.push("");
  }

  for (const cls of dedupedClasses) {
    const ownMethodNames = new Set(cls.methods.map((m) => m.name));
    const inheritedProps = inheritedMembers.get(cls.name)?.properties ?? new Set<string>();
    const conflictingProps = [...ownMethodNames].filter((n) => inheritedProps.has(n));

    let extendsClause = "";
    if (cls.baseClass && knownClasses.has(cls.baseClass)) {
      if (conflictingProps.length > 0) {
        const omits = conflictingProps.map((n) => `"${n}"`).join(" | ");
        extendsClause = ` extends Omit<${cls.baseClass}, ${omits}>`;
      } else {
        extendsClause = ` extends ${cls.baseClass}`;
      }
    }

    pluginApiLines.push(`export interface ${cls.name}${extendsClause} {`);

    for (const prop of cls.properties) {
      const m = mapType(prop.cppType, knownClasses);
      collectReferenced(m.ts, referencedTypes);
      warnings.push(...m.warnings.map((w) => `${cls.name}.${prop.name}: ${w}`));
      const ro = prop.readOnly ? "readonly " : "";
      pluginApiLines.push(`  ${ro}${prop.name}: ${m.ts};`);
    }

    for (const method of cls.methods) {
      const ret = mapType(method.cppType, knownClasses);
      collectReferenced(ret.ts, referencedTypes);
      warnings.push(...ret.warnings.map((w) => `${cls.name}.${method.name}() return: ${w}`));
      const params = method.params
        .map((p, i) => {
          const t = mapType(p.cppType, knownClasses);
          collectReferenced(t.ts, referencedTypes);
          warnings.push(...t.warnings.map((w) => `${cls.name}.${method.name}() arg ${i}: ${w}`));
          const safeName = /^[A-Za-z_]\w*$/.test(p.name) ? p.name : `arg${i}`;
          return `${safeName}: ${t.ts}`;
        })
        .join(", ");
      pluginApiLines.push(`  ${method.name}(${params}): ${ret.ts};`);
    }

    pluginApiLines.push("}");
    pluginApiLines.push("");
  }

  // モデル化できなかった参照型に対する補助的な型エイリアス。
  const auxiliary: string[] = [];
  for (const ref of [...referencedTypes].sort()) {
    if (knownClasses.has(ref)) continue;
    if (knownEnumNames.has(ref)) continue;
    if (BUILTIN_TS_TYPES.has(ref)) continue;
    if (Object.hasOwn(QT_TYPE_ALIASES, ref)) {
      auxiliary.push(`export type ${ref} = ${QT_TYPE_ALIASES[ref]};`);
      continue;
    }
    // 未知の Qt の enum 相当 — number としてモデル化する（apiv1 は enum を int として返す）。
    auxiliary.push(`export type ${ref} = number;`);
  }
  if (auxiliary.length > 0) {
    pluginApiLines.push("// Plugin API から参照されているがモデル化されていない補助型。");
    pluginApiLines.push(...auxiliary);
    pluginApiLines.push("");
  }

  pluginApiLines.push(
    `export type PluginApiClassName = ${
      [...knownClasses]
        .sort()
        .map((n) => `"${n}"`)
        .join(" | ") || "never"
    };`,
  );
  pluginApiLines.push("");

  const enumLines: string[] = [];
  enumLines.push(HEADER);
  enumLines.push("");
  for (const en of dedupedEnums) {
    if (en.members.length === 0) continue;
    enumLines.push(`export const ${en.name} = {`);
    let next = 0;
    for (const m of en.members) {
      let value: number | string;
      if (m.value !== undefined) {
        const n = Number(m.value);
        value = Number.isFinite(n) ? n : JSON.stringify(m.value);
      } else {
        value = next;
      }
      if (typeof value === "number") next = value + 1;
      enumLines.push(`  ${m.name}: ${value},`);
    }
    enumLines.push("} as const;");
    enumLines.push(`export type ${en.name} = (typeof ${en.name})[keyof typeof ${en.name}];`);
    enumLines.push("");
  }

  return {
    pluginApi: pluginApiLines.join("\n"),
    enums: enumLines.join("\n"),
    warnings,
  };
}

function collectReferenced(tsType: string, into: Set<string>): void {
  for (const id of tsType.matchAll(/[A-Za-z_]\w*/g)) {
    const name = id[0];
    if (!name) continue;
    if (BUILTIN_TS_TYPES.has(name)) continue;
    if (name === "Omit" || name === "Record") continue;
    if (/^[A-Z]/.test(name)) into.add(name);
  }
}

interface InheritedSet {
  properties: Set<string>;
}

function computeInheritedMembers(classes: ClassDecl[]): Map<string, InheritedSet> {
  const byName = new Map<string, ClassDecl>();
  for (const c of classes) byName.set(c.name, c);

  const cache = new Map<string, InheritedSet>();
  function visit(name: string, stack: Set<string>): InheritedSet {
    const existing = cache.get(name);
    if (existing) return existing;
    if (stack.has(name)) return { properties: new Set() };
    const cls = byName.get(name);
    if (!cls) return { properties: new Set() };
    const result: InheritedSet = { properties: new Set() };
    if (cls.baseClass && byName.has(cls.baseClass)) {
      stack.add(name);
      const base = byName.get(cls.baseClass);
      if (base) {
        const baseInherited = visit(cls.baseClass, stack);
        for (const p of baseInherited.properties) result.properties.add(p);
        for (const p of base.properties) result.properties.add(p.name);
      }
      stack.delete(name);
    }
    cache.set(name, result);
    return result;
  }
  for (const c of classes) visit(c.name, new Set());
  return cache;
}

function dedupeClasses(classes: ClassDecl[]): ClassDecl[] {
  const seen = new Map<string, ClassDecl>();
  for (const c of classes) {
    const existing = seen.get(c.name);
    if (!existing) {
      seen.set(c.name, c);
      continue;
    }
    seen.set(c.name, mergeClass(existing, c));
  }
  return [...seen.values()];
}

function mergeClass(a: ClassDecl, b: ClassDecl): ClassDecl {
  const properties = dedupeBy([...a.properties, ...b.properties], (p) => p.name);
  const methods = dedupeBy([...a.methods, ...b.methods], (m) => `${m.name}(${m.params.length})`);
  return {
    name: a.name,
    baseClass: a.baseClass ?? b.baseClass,
    properties,
    methods,
    enums: [...a.enums, ...b.enums],
  };
}

function dedupeEnums(enums: EnumDecl[]): EnumDecl[] {
  const seen = new Map<string, EnumDecl>();
  for (const e of enums) {
    if (!seen.has(e.name)) seen.set(e.name, e);
  }
  return [...seen.values()];
}

function dedupeBy<T>(arr: T[], key: (t: T) => string): T[] {
  const seen = new Map<string, T>();
  for (const item of arr) {
    const k = key(item);
    if (!seen.has(k)) seen.set(k, item);
  }
  return [...seen.values()];
}
