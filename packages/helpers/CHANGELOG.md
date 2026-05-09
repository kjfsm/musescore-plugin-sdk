# @kjfsm/musescore-plugin-sdk-helpers

## 0.0.2

### Patch Changes

- [#9](https://github.com/kjfsm/musescore-plugin-sdk/pull/9) [`d371c6a`](https://github.com/kjfsm/musescore-plugin-sdk/commit/d371c6a88558f59c50a49d990deadb62bf4eb4ae) Thanks [@kjfsm](https://github.com/kjfsm)! - Add `@kjfsm/musescore-plugin-sdk-helpers`, a runtime helpers package for MuseScore 4 plugins. Provides traversal generators (`iterateNotes`, `iterateChords`, `iterateMeasures`, `iterateSegments`, `iterateAnnotations`), element predicates (`isChord` / `isNote` / `isRest`), selection helpers (`hasRangeSelection`, `getSelectedElements`, `getSelectionRange`), navigation (`findMeasureByIndex`, `findSegmentByTick`, `jumpToElement`, `jumpToMeasure`), an empty-string-safe `getMetaTag`, and a `withCmd` wrapper around `Score.startCmd` / `endCmd`.
