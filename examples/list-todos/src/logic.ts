import { iterateAnnotations, jumpToElement } from "@kjfsm/musescore-plugin-sdk-helpers";
import type { EngravingItem, Score } from "@kjfsm/musescore-plugin-sdk-types";

// `text` / `plainText` are exposed at runtime on text-typed engraving items
// (StaffText, TempoText, ...) but aren't on the generated TS surface.
type TextLike = { text?: string; plainText?: string };

const TODO_PATTERN = /\b(TODO|FIXME)\b/i;

function getText(el: EngravingItem): string | undefined {
  const t = el as EngravingItem & TextLike;
  return t.plainText ?? t.text;
}

export interface TodoHit {
  element: EngravingItem;
  text: string;
}

export function findTodos(score: Score): TodoHit[] {
  const hits: TodoHit[] = [];
  for (const annotation of iterateAnnotations(score)) {
    const text = getText(annotation);
    if (text && TODO_PATTERN.test(text)) {
      hits.push({ element: annotation, text });
    }
  }
  return hits;
}

export function run(score: Score | null): void {
  if (!score) {
    console.log("no score is open");
    return;
  }
  const hits = findTodos(score);
  if (hits.length === 0) {
    console.log("no TODO/FIXME annotations found");
    return;
  }
  console.log(`found ${hits.length} TODO/FIXME annotation(s):`);
  for (const hit of hits) console.log(`  - ${hit.text}`);

  const first = hits[0];
  if (first) jumpToElement(score, first.element);
}
