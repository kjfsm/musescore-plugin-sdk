// @kjfsm/musescore-plugin-sdk-types-generator が自動生成したファイル。手で編集しないこと。
// 再生成するにはリポジトリのルートで `pnpm generate:types` を実行する。


export const Ownership = {
  PLUGIN: 0,
  SCORE: 1,
} as const;
export type Ownership = (typeof Ownership)[keyof typeof Ownership];

export const RewindMode = {
  SCORE_START: 0,
  SELECTION_START: 1,
  SELECTION_END: 2,
} as const;
export type RewindMode = (typeof RewindMode)[keyof typeof RewindMode];

export const InputStateMode = {
  INPUT_STATE_INDEPENDENT: 0,
  INPUT_STATE_SYNC_WITH_SCORE: 1,
} as const;
export type InputStateMode = (typeof InputStateMode)[keyof typeof InputStateMode];
