---
"@kjfsm/musescore-plugin-sdk-helpers": minor
---

Add `@kjfsm/musescore-plugin-sdk-helpers`, a runtime helpers package for MuseScore 4 plugins. Provides traversal generators (`iterateNotes`, `iterateChords`, `iterateMeasures`, `iterateSegments`, `iterateAnnotations`), element predicates (`isChord` / `isNote` / `isRest`), selection helpers (`hasRangeSelection`, `getSelectedElements`, `getSelectionRange`), navigation (`findMeasureByIndex`, `findSegmentByTick`, `jumpToElement`, `jumpToMeasure`), an empty-string-safe `getMetaTag`, and a `withCmd` wrapper around `Score.startCmd` / `endCmd`.
