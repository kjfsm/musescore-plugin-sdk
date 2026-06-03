---
"@kjfsm/musescore-plugin-sdk-helpers": minor
---

スパナ／アーティキュレーション系ヘルパを追加しました。

- `isSlur(el)` — スラー（`Spanner`）の述語（`el.name === "Slur"`）。
- `getSpannerRange(spanner)` — 任意のスパナの tick 範囲 `{ startTick, endTick }` を返す（`getHairpinRange` を一般化）。`getHairpinRange` はこれに委譲する薄いラッパになり、挙動は不変。`HairpinRange` は `SpannerRange` の別名。
- `getArticulationNames(chord)` — 和音に付いたアーティキュレーション名（`subtypeName()`、例: `"Staccato"`）の配列を返す。

MuseScore のバージョン対応は変更ありません（4.7）。
