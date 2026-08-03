---
"@kjfsm/musescore-plugin-sdk-types": minor
---

実行時 enum オブジェクトの型 `BracketTypeEnum` を追加

システムブラケット（`Staff.brackets` の各要素が持つ `systemBracket`）は int でしか取得できず、`ElementType` のような名前アクセサも無いため、判定には実行時 enum オブジェクトを QML から受け渡す必要がある。しかし `ElementEnum` / `NoteTypeEnum` / `BarLineTypeEnum` しか用意されておらず、利用側で `RuntimeEnum<BracketTypeName, BracketType>` を合成するしかなかった。

あわせて `BracketTypeName` も re-export し、`BarLineTypeName` などと同じくパッケージのルートから型名で参照できるようにした。
