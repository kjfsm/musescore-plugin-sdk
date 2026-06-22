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

export const NoteType = {
  NORMAL: 0,
  ACCIACCATURA: 1,
  APPOGGIATURA: 2,
  GRACE4: 4,
  GRACE16: 8,
  GRACE32: 16,
  GRACE8_AFTER: 32,
  GRACE16_AFTER: 64,
  GRACE32_AFTER: 128,
  INVALID: 255,
} as const;
export type NoteType = (typeof NoteType)[keyof typeof NoteType];

export const PlayEventType = {
  Auto: 0,
  User: 1,
} as const;
export type PlayEventType = (typeof PlayEventType)[keyof typeof PlayEventType];

export const AccidentalType = {
  NONE: 0,
  FLAT: 1,
  NATURAL: 2,
  SHARP: 3,
  SHARP2: 4,
  FLAT2: 5,
  SHARP3: 6,
  FLAT3: 7,
  NATURAL_FLAT: 8,
  NATURAL_SHARP: 9,
  SHARP_SHARP: 10,
  FLAT_ARROW_UP: 11,
  FLAT_ARROW_DOWN: 12,
  NATURAL_ARROW_UP: 13,
  NATURAL_ARROW_DOWN: 14,
  SHARP_ARROW_UP: 15,
  SHARP_ARROW_DOWN: 16,
  SHARP2_ARROW_UP: 17,
  SHARP2_ARROW_DOWN: 18,
  FLAT2_ARROW_UP: 19,
  FLAT2_ARROW_DOWN: 20,
  ARROW_DOWN: 21,
  ARROW_UP: 22,
  MIRRORED_FLAT: 23,
  MIRRORED_FLAT2: 24,
  SHARP_SLASH: 25,
  SHARP_SLASH4: 26,
  FLAT_SLASH2: 27,
  FLAT_SLASH: 28,
  SHARP_SLASH3: 29,
  SHARP_SLASH2: 30,
  DOUBLE_FLAT_ONE_ARROW_DOWN: 31,
  FLAT_ONE_ARROW_DOWN: 32,
  NATURAL_ONE_ARROW_DOWN: 33,
  SHARP_ONE_ARROW_DOWN: 34,
  DOUBLE_SHARP_ONE_ARROW_DOWN: 35,
  DOUBLE_FLAT_ONE_ARROW_UP: 36,
  FLAT_ONE_ARROW_UP: 37,
  NATURAL_ONE_ARROW_UP: 38,
  SHARP_ONE_ARROW_UP: 39,
  DOUBLE_SHARP_ONE_ARROW_UP: 40,
  DOUBLE_FLAT_TWO_ARROWS_DOWN: 41,
  FLAT_TWO_ARROWS_DOWN: 42,
  NATURAL_TWO_ARROWS_DOWN: 43,
  SHARP_TWO_ARROWS_DOWN: 44,
  DOUBLE_SHARP_TWO_ARROWS_DOWN: 45,
  DOUBLE_FLAT_TWO_ARROWS_UP: 46,
  FLAT_TWO_ARROWS_UP: 47,
  NATURAL_TWO_ARROWS_UP: 48,
  SHARP_TWO_ARROWS_UP: 49,
  DOUBLE_SHARP_TWO_ARROWS_UP: 50,
  DOUBLE_FLAT_THREE_ARROWS_DOWN: 51,
  FLAT_THREE_ARROWS_DOWN: 52,
  NATURAL_THREE_ARROWS_DOWN: 53,
  SHARP_THREE_ARROWS_DOWN: 54,
  DOUBLE_SHARP_THREE_ARROWS_DOWN: 55,
  DOUBLE_FLAT_THREE_ARROWS_UP: 56,
  FLAT_THREE_ARROWS_UP: 57,
  NATURAL_THREE_ARROWS_UP: 58,
  SHARP_THREE_ARROWS_UP: 59,
  DOUBLE_SHARP_THREE_ARROWS_UP: 60,
  LOWER_ONE_SEPTIMAL_COMMA: 61,
  RAISE_ONE_SEPTIMAL_COMMA: 62,
  LOWER_TWO_SEPTIMAL_COMMAS: 63,
  RAISE_TWO_SEPTIMAL_COMMAS: 64,
  LOWER_ONE_UNDECIMAL_QUARTERTONE: 65,
  RAISE_ONE_UNDECIMAL_QUARTERTONE: 66,
  LOWER_ONE_TRIDECIMAL_QUARTERTONE: 67,
  RAISE_ONE_TRIDECIMAL_QUARTERTONE: 68,
  DOUBLE_FLAT_EQUAL_TEMPERED: 69,
  FLAT_EQUAL_TEMPERED: 70,
  NATURAL_EQUAL_TEMPERED: 71,
  SHARP_EQUAL_TEMPERED: 72,
  DOUBLE_SHARP_EQUAL_TEMPERED: 73,
  QUARTER_FLAT_EQUAL_TEMPERED: 74,
  QUARTER_SHARP_EQUAL_TEMPERED: 75,
  FLAT_17: 76,
  SHARP_17: 77,
  FLAT_19: 78,
  SHARP_19: 79,
  FLAT_23: 80,
  SHARP_23: 81,
  FLAT_31: 82,
  SHARP_31: 83,
  FLAT_53: 84,
  SHARP_53: 85,
  EQUALS_ALMOST: 86,
  EQUALS: 87,
  TILDE: 88,
  SORI: 89,
  KORON: 90,
  TEN_TWELFTH_FLAT: 91,
  TEN_TWELFTH_SHARP: 92,
  ELEVEN_TWELFTH_FLAT: 93,
  ELEVEN_TWELFTH_SHARP: 94,
  ONE_TWELFTH_FLAT: 95,
  ONE_TWELFTH_SHARP: 96,
  TWO_TWELFTH_FLAT: 97,
  TWO_TWELFTH_SHARP: 98,
  THREE_TWELFTH_FLAT: 99,
  THREE_TWELFTH_SHARP: 100,
  FOUR_TWELFTH_FLAT: 101,
  FOUR_TWELFTH_SHARP: 102,
  FIVE_TWELFTH_FLAT: 103,
  FIVE_TWELFTH_SHARP: 104,
  SIX_TWELFTH_FLAT: 105,
  SIX_TWELFTH_SHARP: 106,
  SEVEN_TWELFTH_FLAT: 107,
  SEVEN_TWELFTH_SHARP: 108,
  EIGHT_TWELFTH_FLAT: 109,
  EIGHT_TWELFTH_SHARP: 110,
  NINE_TWELFTH_FLAT: 111,
  NINE_TWELFTH_SHARP: 112,
  SAGITTAL_5V7KD: 113,
  SAGITTAL_5V7KU: 114,
  SAGITTAL_5CD: 115,
  SAGITTAL_5CU: 116,
  SAGITTAL_7CD: 117,
  SAGITTAL_7CU: 118,
  SAGITTAL_25SDD: 119,
  SAGITTAL_25SDU: 120,
  SAGITTAL_35MDD: 121,
  SAGITTAL_35MDU: 122,
  SAGITTAL_11MDD: 123,
  SAGITTAL_11MDU: 124,
  SAGITTAL_11LDD: 125,
  SAGITTAL_11LDU: 126,
  SAGITTAL_35LDD: 127,
  SAGITTAL_35LDU: 128,
  SAGITTAL_FLAT25SU: 129,
  SAGITTAL_SHARP25SD: 130,
  SAGITTAL_FLAT7CU: 131,
  SAGITTAL_SHARP7CD: 132,
  SAGITTAL_FLAT5CU: 133,
  SAGITTAL_SHARP5CD: 134,
  SAGITTAL_FLAT5V7KU: 135,
  SAGITTAL_SHARP5V7KD: 136,
  SAGITTAL_FLAT: 137,
  SAGITTAL_SHARP: 138,
  ONE_COMMA_FLAT: 139,
  ONE_COMMA_SHARP: 140,
  TWO_COMMA_FLAT: 141,
  TWO_COMMA_SHARP: 142,
  THREE_COMMA_FLAT: 143,
  THREE_COMMA_SHARP: 144,
  FOUR_COMMA_FLAT: 145,
  FIVE_COMMA_SHARP: 146,
  END: 147,
} as const;
export type AccidentalType = (typeof AccidentalType)[keyof typeof AccidentalType];

export const AccidentalBracket = {
  NONE: 0,
  PARENTHESIS: 1,
  BRACKET: 2,
  BRACE: 3,
} as const;
export type AccidentalBracket = (typeof AccidentalBracket)[keyof typeof AccidentalBracket];

export const ElementType = {
  INVALID: 0,
  BRACKET_ITEM: 1,
  PART: 2,
  STAFF: 3,
  SCORE: 4,
  TEXT: 5,
  LAYOUT_BREAK: 6,
  MEASURE_NUMBER: 7,
  MMREST_RANGE: 8,
  INSTRUMENT_NAME: 9,
  BAR_LINE: 10,
  STAFF_LINES: 11,
  SYSTEM_DIVIDER: 12,
  SLUR: 13,
  SLUR_SEGMENT: 14,
  TIE: 15,
  TIE_SEGMENT: 16,
  LAISSEZ_VIB: 17,
  LAISSEZ_VIB_SEGMENT: 18,
  PARTIAL_TIE: 19,
  PARTIAL_TIE_SEGMENT: 20,
  STEM_SLASH: 21,
  ARPEGGIO: 22,
  CHORD_BRACKET: 23,
  ACCIDENTAL: 24,
  LEDGER_LINE: 25,
  STEM: 26,
  HOOK: 27,
  NOTE: 28,
  CLEF: 29,
  KEYSIG: 30,
  AMBITUS: 31,
  TIMESIG: 32,
  REST: 33,
  MMREST: 34,
  DEAD_SLAPPED: 35,
  SYMBOL: 36,
  BREATH: 37,
  MEASURE_REPEAT: 38,
  ARTICULATION: 39,
  ORNAMENT: 40,
  FERMATA: 41,
  CHORDLINE: 42,
  DYNAMIC: 43,
  EXPRESSION: 44,
  BEAM: 45,
  LYRICS: 46,
  FIGURED_BASS: 47,
  FIGURED_BASS_ITEM: 48,
  MARKER: 49,
  JUMP: 50,
  FINGERING: 51,
  TUPLET: 52,
  TEMPO_TEXT: 53,
  STAFF_TEXT: 54,
  SYSTEM_TEXT: 55,
  SOUND_FLAG: 56,
  PLAY_COUNT_TEXT: 57,
  PLAYTECH_ANNOTATION: 58,
  CAPO: 59,
  STRING_TUNINGS: 60,
  TRIPLET_FEEL: 61,
  REHEARSAL_MARK: 62,
  INSTRUMENT_CHANGE: 63,
  STAFFTYPE_CHANGE: 64,
  FRET_DIAGRAM: 65,
  HARMONY: 66,
  HARP_DIAGRAM: 67,
  BEND: 68,
  TREMOLOBAR: 69,
  VOLTA: 70,
  VOLTA_SEGMENT: 71,
  HAIRPIN: 72,
  HAIRPIN_SEGMENT: 73,
  OTTAVA: 74,
  OTTAVA_SEGMENT: 75,
  TRILL: 76,
  TRILL_SEGMENT: 77,
  LET_RING: 78,
  LET_RING_SEGMENT: 79,
  GRADUAL_TEMPO_CHANGE: 80,
  GRADUAL_TEMPO_CHANGE_SEGMENT: 81,
  VIBRATO: 82,
  VIBRATO_SEGMENT: 83,
  PALM_MUTE: 84,
  PALM_MUTE_SEGMENT: 85,
  WHAMMY_BAR: 86,
  WHAMMY_BAR_SEGMENT: 87,
  RASGUEADO: 88,
  RASGUEADO_SEGMENT: 89,
  HARMONIC_MARK: 90,
  HARMONIC_MARK_SEGMENT: 91,
  PICK_SCRAPE: 92,
  PICK_SCRAPE_SEGMENT: 93,
  TEXTLINE: 94,
  TEXTLINE_SEGMENT: 95,
  PEDAL: 96,
  PEDAL_SEGMENT: 97,
  LYRICSLINE: 98,
  LYRICSLINE_SEGMENT: 99,
  PARTIAL_LYRICSLINE: 100,
  PARTIAL_LYRICSLINE_SEGMENT: 101,
  GLISSANDO: 102,
  GLISSANDO_SEGMENT: 103,
  NOTELINE: 104,
  NOTELINE_SEGMENT: 105,
  STAFF_VISIBILITY_INDICATOR: 106,
  SYSTEM_LOCK_INDICATOR: 107,
  SPACER: 108,
  STAFF_STATE: 109,
  NOTEHEAD: 110,
  NOTEDOT: 111,
  IMAGE: 112,
  MEASURE: 113,
  SELECTION: 114,
  LASSO: 115,
  SHADOW_NOTE: 116,
  TAB_DURATION_SYMBOL: 117,
  FSYMBOL: 118,
  PAGE: 119,
  TEXTLINE_BASE: 120,
  BRACKET: 121,
  SEGMENT: 122,
  SYSTEM: 123,
  CHORD: 124,
  HBOX: 125,
  VBOX: 126,
  TBOX: 127,
  FBOX: 128,
  ACTION_ICON: 129,
  BAGPIPE_EMBELLISHMENT: 130,
  STICKING: 131,
  GRACE_NOTES_GROUP: 132,
  GUITAR_BEND: 133,
  GUITAR_BEND_SEGMENT: 134,
  GUITAR_BEND_HOLD: 135,
  GUITAR_BEND_HOLD_SEGMENT: 136,
  GUITAR_BEND_TEXT: 137,
  TREMOLO_TWOCHORD: 138,
  TREMOLO_SINGLECHORD: 139,
  TIME_TICK_ANCHOR: 140,
  PARENTHESIS: 141,
  HAMMER_ON_PULL_OFF: 142,
  HAMMER_ON_PULL_OFF_SEGMENT: 143,
  HAMMER_ON_PULL_OFF_TEXT: 144,
  TAPPING: 145,
  TAPPING_HALF_SLUR: 146,
  TAPPING_HALF_SLUR_SEGMENT: 147,
  TAPPING_TEXT: 148,
  ROOT_ITEM: 149,
  DUMMY: 150,
  MAXTYPE: 151,
} as const;
export type ElementType = (typeof ElementType)[keyof typeof ElementType];

export const OrnamentStyle = {
  DEFAULT: 0,
  BAROQUE: 1,
} as const;
export type OrnamentStyle = (typeof OrnamentStyle)[keyof typeof OrnamentStyle];

export const GlissandoStyle = {
  CHROMATIC: 0,
  WHITE_KEYS: 1,
  BLACK_KEYS: 2,
  DIATONIC: 3,
  PORTAMENTO: 4,
} as const;
export type GlissandoStyle = (typeof GlissandoStyle)[keyof typeof GlissandoStyle];

export const AlignV = {
  TOP: 0,
  VCENTER: 1,
  BOTTOM: 2,
  BASELINE: 3,
} as const;
export type AlignV = (typeof AlignV)[keyof typeof AlignV];

export const AlignH = {
  LEFT: 0,
  RIGHT: 1,
  HCENTER: 2,
  JUSTIFY: 3,
} as const;
export type AlignH = (typeof AlignH)[keyof typeof AlignH];

export const PlacementV = {
  ABOVE: 0,
  BELOW: 1,
} as const;
export type PlacementV = (typeof PlacementV)[keyof typeof PlacementV];

export const PlacementH = {
  LEFT: 0,
  CENTER: 1,
  RIGHT: 2,
} as const;
export type PlacementH = (typeof PlacementH)[keyof typeof PlacementH];

export const TextPlace = {
  AUTO: 0,
  ABOVE: 1,
  BELOW: 2,
  LEFT: 3,
} as const;
export type TextPlace = (typeof TextPlace)[keyof typeof TextPlace];

export const DirectionV = {
  AUTO: 0,
  UP: 1,
  DOWN: 2,
} as const;
export type DirectionV = (typeof DirectionV)[keyof typeof DirectionV];

export const DirectionH = {
  AUTO: 0,
  LEFT: 1,
  RIGHT: 2,
} as const;
export type DirectionH = (typeof DirectionH)[keyof typeof DirectionH];

export const Orientation = {
  VERTICAL: 0,
  HORIZONTAL: 1,
} as const;
export type Orientation = (typeof Orientation)[keyof typeof Orientation];

export const AutoOnOff = {
  AUTO: 0,
  ON: 1,
  OFF: 2,
} as const;
export type AutoOnOff = (typeof AutoOnOff)[keyof typeof AutoOnOff];

export const AutoCustomHide = {
  AUTO: 0,
  CUSTOM: 1,
  HIDE: 2,
} as const;
export type AutoCustomHide = (typeof AutoCustomHide)[keyof typeof AutoCustomHide];

export const VoiceAssignment = {
  ALL_VOICE_IN_INSTRUMENT: 0,
  ALL_VOICE_IN_STAFF: 1,
  CURRENT_VOICE_ONLY: 2,
} as const;
export type VoiceAssignment = (typeof VoiceAssignment)[keyof typeof VoiceAssignment];

export const BeamMode = {
  INVALID: -1,
  AUTO: 0,
  NONE: 1,
  BEGIN: 2,
  BEGIN16: 3,
  BEGIN32: 4,
  MID: 5,
  END: 6,
} as const;
export type BeamMode = (typeof BeamMode)[keyof typeof BeamMode];

export const DurationType = {
  V_LONG: 0,
  V_BREVE: 1,
  V_WHOLE: 2,
  V_HALF: 3,
  V_QUARTER: 4,
  V_EIGHTH: 5,
  V_16TH: 6,
  V_32ND: 7,
  V_64TH: 8,
  V_128TH: 9,
  V_256TH: 10,
  V_512TH: 11,
  V_1024TH: 12,
  V_ZERO: 13,
  V_MEASURE: 14,
  V_INVALID: 15,
} as const;
export type DurationType = (typeof DurationType)[keyof typeof DurationType];

export const LayoutBreakType = {
  PAGE: 0,
  LINE: 1,
  SECTION: 2,
  NOBREAK: 3,
} as const;
export type LayoutBreakType = (typeof LayoutBreakType)[keyof typeof LayoutBreakType];

export const VeloType = {
  OFFSET_VAL: 0,
  USER_VAL: 1,
} as const;
export type VeloType = (typeof VeloType)[keyof typeof VeloType];

export const BarLineType = {
  NORMAL: 1,
  DOUBLE: 2,
  START_REPEAT: 4,
  END_REPEAT: 8,
  BROKEN: 16,
  END: 32,
  END_START_REPEAT: 64,
  DOTTED: 128,
  REVERSE_END: 256,
  HEAVY: 512,
  DOUBLE_HEAVY: 1024,
} as const;
export type BarLineType = (typeof BarLineType)[keyof typeof BarLineType];

export const MeasureNumberPlacement = {
  ABOVE_SYSTEM: 0,
  BELOW_SYSTEM: 1,
  ON_SYSTEM_OBJECT_STAVES: 2,
  ON_ALL_STAVES: 3,
} as const;
export type MeasureNumberPlacement = (typeof MeasureNumberPlacement)[keyof typeof MeasureNumberPlacement];

export const NoteHeadType = {
  HEAD_AUTO: -1,
  HEAD_WHOLE: 0,
  HEAD_HALF: 1,
  HEAD_QUARTER: 2,
  HEAD_BREVIS: 3,
  HEAD_TYPES: 4,
} as const;
export type NoteHeadType = (typeof NoteHeadType)[keyof typeof NoteHeadType];

export const NoteHeadScheme = {
  HEAD_AUTO: -1,
  HEAD_NORMAL: 0,
  HEAD_PITCHNAME: 1,
  HEAD_PITCHNAME_GERMAN: 2,
  HEAD_SOLFEGE: 3,
  HEAD_SOLFEGE_FIXED: 4,
  HEAD_SHAPE_NOTE_4: 5,
  HEAD_SHAPE_NOTE_7_AIKIN: 6,
  HEAD_SHAPE_NOTE_7_FUNK: 7,
  HEAD_SHAPE_NOTE_7_WALKER: 8,
  HEAD_SCHEMES: 9,
} as const;
export type NoteHeadScheme = (typeof NoteHeadScheme)[keyof typeof NoteHeadScheme];

export const NoteHeadGroup = {
  HEAD_NORMAL: 0,
  HEAD_CROSS: 1,
  HEAD_PLUS: 2,
  HEAD_XCIRCLE: 3,
  HEAD_WITHX: 4,
  HEAD_TRIANGLE_UP: 5,
  HEAD_TRIANGLE_DOWN: 6,
  HEAD_SLASHED1: 7,
  HEAD_SLASHED2: 8,
  HEAD_DIAMOND: 9,
  HEAD_DIAMOND_OLD: 10,
  HEAD_CIRCLED: 11,
  HEAD_CIRCLED_LARGE: 12,
  HEAD_LARGE_ARROW: 13,
  HEAD_BREVIS_ALT: 14,
  HEAD_SLASH: 15,
  HEAD_LARGE_DIAMOND: 16,
  HEAD_SOL: 17,
  HEAD_LA: 18,
  HEAD_FA: 19,
  HEAD_MI: 20,
  HEAD_DO: 21,
  HEAD_RE: 22,
  HEAD_TI: 23,
  HEAD_HEAVY_CROSS: 24,
  HEAD_HEAVY_CROSS_HAT: 25,
  HEAD_DO_WALKER: 26,
  HEAD_RE_WALKER: 27,
  HEAD_TI_WALKER: 28,
  HEAD_DO_FUNK: 29,
  HEAD_RE_FUNK: 30,
  HEAD_TI_FUNK: 31,
  HEAD_DO_NAME: 32,
  HEAD_DI_NAME: 33,
  HEAD_RA_NAME: 34,
  HEAD_RE_NAME: 35,
  HEAD_RI_NAME: 36,
  HEAD_ME_NAME: 37,
  HEAD_MI_NAME: 38,
  HEAD_FA_NAME: 39,
  HEAD_FI_NAME: 40,
  HEAD_SE_NAME: 41,
  HEAD_SOL_NAME: 42,
  HEAD_LE_NAME: 43,
  HEAD_LA_NAME: 44,
  HEAD_LI_NAME: 45,
  HEAD_TE_NAME: 46,
  HEAD_TI_NAME: 47,
  HEAD_SI_NAME: 48,
  HEAD_A_SHARP: 49,
  HEAD_A: 50,
  HEAD_A_FLAT: 51,
  HEAD_B_SHARP: 52,
  HEAD_B: 53,
  HEAD_B_FLAT: 54,
  HEAD_C_SHARP: 55,
  HEAD_C: 56,
  HEAD_C_FLAT: 57,
  HEAD_D_SHARP: 58,
  HEAD_D: 59,
  HEAD_D_FLAT: 60,
  HEAD_E_SHARP: 61,
  HEAD_E: 62,
  HEAD_E_FLAT: 63,
  HEAD_F_SHARP: 64,
  HEAD_F: 65,
  HEAD_F_FLAT: 66,
  HEAD_G_SHARP: 67,
  HEAD_G: 68,
  HEAD_G_FLAT: 69,
  HEAD_H: 70,
  HEAD_H_SHARP: 71,
  HEAD_SWISS_RUDIMENTS_FLAM: 72,
  HEAD_SWISS_RUDIMENTS_DOUBLE: 73,
  HEAD_CUSTOM: 74,
  HEAD_GROUPS: 75,
  HEAD_INVALID: -1,
} as const;
export type NoteHeadGroup = (typeof NoteHeadGroup)[keyof typeof NoteHeadGroup];

export const ClefType = {
  INVALID: -1,
  G: 0,
  G15_MB: 1,
  G8_VB: 2,
  G8_VA: 3,
  G15_MA: 4,
  G8_VB_O: 5,
  G8_VB_P: 6,
  G_1: 7,
  C1: 8,
  C2: 9,
  C3: 10,
  C4: 11,
  C5: 12,
  C_19C: 13,
  C1_F18C: 14,
  C3_F18C: 15,
  C4_F18C: 16,
  C1_F20C: 17,
  C3_F20C: 18,
  C4_F20C: 19,
  F: 20,
  F15_MB: 21,
  F8_VB: 22,
  F_8VA: 23,
  F_15MA: 24,
  F_B: 25,
  F_C: 26,
  F_F18C: 27,
  F_19C: 28,
  PERC: 29,
  PERC2: 30,
  TAB: 31,
  TAB4: 32,
  TAB_SERIF: 33,
  TAB4_SERIF: 34,
  C4_8VB: 35,
  G8_VB_C: 36,
  MAX: 37,
} as const;
export type ClefType = (typeof ClefType)[keyof typeof ClefType];

export const ClefToBarlinePosition = {
  AUTO: 0,
  BEFORE: 1,
  AFTER: 2,
} as const;
export type ClefToBarlinePosition = (typeof ClefToBarlinePosition)[keyof typeof ClefToBarlinePosition];

export const DynamicType = {
  OTHER: 0,
  PPPPPP: 1,
  PPPPP: 2,
  PPPP: 3,
  PPP: 4,
  PP: 5,
  P: 6,
  MP: 7,
  MF: 8,
  F: 9,
  FF: 10,
  FFF: 11,
  FFFF: 12,
  FFFFF: 13,
  FFFFFF: 14,
  FP: 15,
  PF: 16,
  SF: 17,
  SFZ: 18,
  SFF: 19,
  SFFZ: 20,
  SFFF: 21,
  SFFFZ: 22,
  SFP: 23,
  SFPP: 24,
  RFZ: 25,
  RF: 26,
  FZ: 27,
  M: 28,
  R: 29,
  S: 30,
  Z: 31,
  N: 32,
  LAST: 33,
} as const;
export type DynamicType = (typeof DynamicType)[keyof typeof DynamicType];

export const DynamicSpeed = {
  SLOW: 0,
  NORMAL: 1,
  FAST: 2,
} as const;
export type DynamicSpeed = (typeof DynamicSpeed)[keyof typeof DynamicSpeed];

export const LineType = {
  SOLID: 0,
  DASHED: 1,
  DOTTED: 2,
} as const;
export type LineType = (typeof LineType)[keyof typeof LineType];

export const HookType = {
  NONE: 0,
  HOOK_90: 1,
  HOOK_45: 2,
  HOOK_90T: 3,
  ARROW: 4,
  ARROW_FILLED: 5,
  ROSETTE: 6,
} as const;
export type HookType = (typeof HookType)[keyof typeof HookType];

export const KeyMode = {
  UNKNOWN: -1,
  NONE: 0,
  MAJOR: 1,
  MINOR: 2,
  DORIAN: 3,
  PHRYGIAN: 4,
  LYDIAN: 5,
  MIXOLYDIAN: 6,
  AEOLIAN: 7,
  IONIAN: 8,
  LOCRIAN: 9,
} as const;
export type KeyMode = (typeof KeyMode)[keyof typeof KeyMode];

export const ArpeggioType = {
  NORMAL: 0,
  UP: 1,
  DOWN: 2,
  BRACKET: 3,
  UP_STRAIGHT: 4,
  DOWN_STRAIGHT: 5,
} as const;
export type ArpeggioType = (typeof ArpeggioType)[keyof typeof ArpeggioType];

export const IntervalStep = {
  UNISON: 0,
  SECOND: 1,
  THIRD: 2,
  FOURTH: 3,
  FIFTH: 4,
  SIXTH: 5,
  SEVENTH: 6,
  OCTAVE: 7,
} as const;
export type IntervalStep = (typeof IntervalStep)[keyof typeof IntervalStep];

export const IntervalType = {
  AUTO: 0,
  AUGMENTED: 1,
  MAJOR: 2,
  PERFECT: 3,
  MINOR: 4,
  DIMINISHED: 5,
} as const;
export type IntervalType = (typeof IntervalType)[keyof typeof IntervalType];

export const InstrumentLabelVisibility = {
  LONG: 0,
  SHORT: 1,
  HIDE: 2,
} as const;
export type InstrumentLabelVisibility = (typeof InstrumentLabelVisibility)[keyof typeof InstrumentLabelVisibility];

export const OrnamentShowAccidental = {
  DEFAULT: 0,
  ANY_ALTERATION: 1,
  ALWAYS: 2,
} as const;
export type OrnamentShowAccidental = (typeof OrnamentShowAccidental)[keyof typeof OrnamentShowAccidental];

export const PartialSpannerDirection = {
  NONE: -1,
  INCOMING: 0,
  OUTGOING: 1,
  BOTH: 2,
} as const;
export type PartialSpannerDirection = (typeof PartialSpannerDirection)[keyof typeof PartialSpannerDirection];

export const ChordStylePreset = {
  STANDARD: 0,
  JAZZ: 1,
  LEGACY: 2,
  CUSTOM: 3,
} as const;
export type ChordStylePreset = (typeof ChordStylePreset)[keyof typeof ChordStylePreset];

export const DisplayCapoChordType = {
  CONCERT: 0,
  BOTH: 1,
  TRANSPOSED: 2,
} as const;
export type DisplayCapoChordType = (typeof DisplayCapoChordType)[keyof typeof DisplayCapoChordType];

export const ParenthesesMode = {
  NONE: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTH: 3,
} as const;
export type ParenthesesMode = (typeof ParenthesesMode)[keyof typeof ParenthesesMode];

export const RepeatPlayCountPreset = {
  X_N: 0,
  N_X: 1,
  PLAY_N_TIMES: 2,
  N_REPEATS: 3,
} as const;
export type RepeatPlayCountPreset = (typeof RepeatPlayCountPreset)[keyof typeof RepeatPlayCountPreset];

export const TextStyleType = {
  DEFAULT: 0,
  TITLE: 1,
  SUBTITLE: 2,
  COMPOSER: 3,
  LYRICIST: 4,
  TRANSLATOR: 5,
  FRAME: 6,
  INSTRUMENT_EXCERPT: 7,
  INSTRUMENT_LONG: 8,
  INSTRUMENT_SHORT: 9,
  INSTRUMENT_CHANGE: 10,
  HEADER: 11,
  FOOTER: 12,
  COPYRIGHT: 13,
  PAGE_NUMBER: 14,
  MEASURE_NUMBER: 15,
  MEASURE_NUMBER_ALTERNATE: 16,
  MMREST_RANGE: 17,
  TEMPO: 18,
  TEMPO_CHANGE: 19,
  METRONOME: 20,
  REPEAT_PLAY_COUNT: 21,
  REPEAT_LEFT: 22,
  REPEAT_RIGHT: 23,
  REHEARSAL_MARK: 24,
  SYSTEM: 25,
  STAFF: 26,
  EXPRESSION: 27,
  DYNAMICS: 28,
  HAIRPIN: 29,
  LYRICS_ODD: 30,
  LYRICS_EVEN: 31,
  HARMONY_A: 32,
  HARMONY_B: 33,
  HARMONY_ROMAN: 34,
  HARMONY_NASHVILLE: 35,
  TUPLET: 36,
  ARTICULATION: 37,
  STICKING: 38,
  FINGERING: 39,
  TAB_FRET_NUMBER: 40,
  LH_GUITAR_FINGERING: 41,
  RH_GUITAR_FINGERING: 42,
  HAMMER_ON_PULL_OFF: 43,
  STRING_NUMBER: 44,
  STRING_TUNINGS: 45,
  FRET_DIAGRAM_FINGERING: 46,
  FRET_DIAGRAM_FRET_NUMBER: 47,
  HARP_PEDAL_DIAGRAM: 48,
  HARP_PEDAL_TEXT_DIAGRAM: 49,
  TEXTLINE: 50,
  SYSTEM_TEXTLINE: 51,
  NOTELINE: 52,
  VOLTA: 53,
  OTTAVA: 54,
  GLISSANDO: 55,
  PEDAL: 56,
  BEND: 57,
  LET_RING: 58,
  WHAMMY_BAR: 59,
  PALM_MUTE: 60,
  USER1: 61,
  USER2: 62,
  USER3: 63,
  USER4: 64,
  USER5: 65,
  USER6: 66,
  USER7: 67,
  USER8: 68,
  USER9: 69,
  USER10: 70,
  USER11: 71,
  USER12: 72,
  TEXT_TYPES: 73,
  IGNORED_TYPES: 74,
} as const;
export type TextStyleType = (typeof TextStyleType)[keyof typeof TextStyleType];

export const FontStyle = {
  Undefined: -1,
  Normal: 0,
} as const;
export type FontStyle = (typeof FontStyle)[keyof typeof FontStyle];

export const PlayingTechniqueType = {
  Undefined: -1,
  Natural: 0,
  Pizzicato: 1,
  Open: 2,
  Mute: 3,
  Tremolo: 4,
  Detache: 5,
  Martele: 6,
  ColLegno: 7,
  SulPonticello: 8,
  SulTasto: 9,
  Vibrato: 10,
  Legato: 11,
  Distortion: 12,
  Overdrive: 13,
  Harmonics: 14,
  JazzTone: 15,
  HandbellsSwing: 16,
  HandbellsSwingUp: 17,
  HandbellsSwingDown: 18,
  HandbellsEcho1: 19,
  HandbellsEcho2: 20,
  HandbellsDamp: 21,
  HandbellsLV: 22,
  HandbellsR: 23,
} as const;
export type PlayingTechniqueType = (typeof PlayingTechniqueType)[keyof typeof PlayingTechniqueType];

export const GradualTempoChangeType = {
  Undefined: -1,
  Accelerando: 0,
  Allargando: 1,
  Calando: 2,
  Lentando: 3,
  Morendo: 4,
  Precipitando: 5,
  Rallentando: 6,
  Ritardando: 7,
  Smorzando: 8,
  Sostenuto: 9,
  Stringendo: 10,
} as const;
export type GradualTempoChangeType = (typeof GradualTempoChangeType)[keyof typeof GradualTempoChangeType];

export const ChangeMethod = {
  NORMAL: 0,
  EXPONENTIAL: 1,
  EASE_IN: 2,
  EASE_OUT: 3,
  EASE_IN_OUT: 4,
} as const;
export type ChangeMethod = (typeof ChangeMethod)[keyof typeof ChangeMethod];

export const ChangeDirection = {
  INCREASING: 0,
  DECREASING: 1,
} as const;
export type ChangeDirection = (typeof ChangeDirection)[keyof typeof ChangeDirection];

export const AccidentalRole = {
  AUTO: 0,
  USER: 1,
} as const;
export type AccidentalRole = (typeof AccidentalRole)[keyof typeof AccidentalRole];

export const AccidentalVal = {
  SHARP3: 3,
  SHARP2: 2,
  SHARP: 1,
  NATURAL: 0,
  FLAT: -1,
  FLAT2: -2,
  FLAT3: -3,
} as const;
export type AccidentalVal = (typeof AccidentalVal)[keyof typeof AccidentalVal];

export const KeySigNatural = {
  NONE: 0,
  BEFORE: 1,
  AFTER: 2,
} as const;
export type KeySigNatural = (typeof KeySigNatural)[keyof typeof KeySigNatural];

export const CourtesyBarlineMode = {
  ALWAYS_SINGLE: 0,
  ALWAYS_DOUBLE: 1,
  DOUBLE_BEFORE_COURTESY: 2,
} as const;
export type CourtesyBarlineMode = (typeof CourtesyBarlineMode)[keyof typeof CourtesyBarlineMode];

export const FermataType = {
  Undefined: -1,
  VeryShort: 0,
  Short: 1,
  ShortHenze: 2,
  Normal: 3,
  Long: 4,
  LongHenze: 5,
  VeryLong: 6,
} as const;
export type FermataType = (typeof FermataType)[keyof typeof FermataType];

export const ChordLineType = {
  NOTYPE: 0,
  FALL: 1,
  DOIT: 2,
  PLOP: 3,
  SCOOP: 4,
} as const;
export type ChordLineType = (typeof ChordLineType)[keyof typeof ChordLineType];

export const SlurStyleType = {
  Undefined: -1,
  Solid: 0,
  Dotted: 1,
  Dashed: 2,
  WideDashed: 3,
} as const;
export type SlurStyleType = (typeof SlurStyleType)[keyof typeof SlurStyleType];

export const TappingHand = {
  INVALID: -1,
  LEFT: 0,
  RIGHT: 1,
} as const;
export type TappingHand = (typeof TappingHand)[keyof typeof TappingHand];

export const LHTappingSymbol = {
  DOT: 0,
  CIRCLED_T: 1,
} as const;
export type LHTappingSymbol = (typeof LHTappingSymbol)[keyof typeof LHTappingSymbol];

export const RHTappingSymbol = {
  T: 0,
  PLUS: 1,
} as const;
export type RHTappingSymbol = (typeof RHTappingSymbol)[keyof typeof RHTappingSymbol];

export const LHTappingShowItems = {
  HALF_SLUR: 0,
  SYMBOL: 1,
  BOTH: 2,
} as const;
export type LHTappingShowItems = (typeof LHTappingShowItems)[keyof typeof LHTappingShowItems];

export const TremoloType = {
  INVALID_TREMOLO: -1,
  R8: 0,
  R16: 1,
  R32: 2,
  R64: 3,
  BUZZ_ROLL: 4,
  C8: 5,
  C16: 6,
  C32: 7,
  C64: 8,
} as const;
export type TremoloType = (typeof TremoloType)[keyof typeof TremoloType];

export const TremoloStyle = {
  DEFAULT: 0,
  TRADITIONAL: 1,
  TRADITIONAL_ALTERNATE: 2,
} as const;
export type TremoloStyle = (typeof TremoloStyle)[keyof typeof TremoloStyle];

export const TremoloChordType = {
  TremoloNone: 0,
  TremoloSingle: 1,
  TremoloFirstChord: 2,
  TremoloSecondChord: 3,
} as const;
export type TremoloChordType = (typeof TremoloChordType)[keyof typeof TremoloChordType];

export const BracketType = {
  NORMAL: 0,
  BRACE: 1,
  SQUARE: 2,
  LINE: 3,
  NO_BRACKET: -1,
} as const;
export type BracketType = (typeof BracketType)[keyof typeof BracketType];

export const GlissandoType = {
  STRAIGHT: 0,
  WAVY: 1,
} as const;
export type GlissandoType = (typeof GlissandoType)[keyof typeof GlissandoType];

export const JumpType = {
  DC: 0,
  DC_AL_FINE: 1,
  DC_AL_CODA: 2,
  DS_AL_CODA: 3,
  DS_AL_FINE: 4,
  DS: 5,
  DC_AL_DBLCODA: 6,
  DS_AL_DBLCODA: 7,
  DSS: 8,
  DSS_AL_CODA: 9,
  DSS_AL_DBLCODA: 10,
  DSS_AL_FINE: 11,
  USER: 12,
} as const;
export type JumpType = (typeof JumpType)[keyof typeof JumpType];

export const MarkerType = {
  SEGNO: 0,
  VARSEGNO: 1,
  CODA: 2,
  VARCODA: 3,
  CODETTA: 4,
  FINE: 5,
  TOCODA: 6,
  TOCODASYM: 7,
  DA_CODA: 8,
  DA_DBLCODA: 9,
  USER: 10,
} as const;
export type MarkerType = (typeof MarkerType)[keyof typeof MarkerType];

export const StaffGroup = {
  STANDARD: 0,
  PERCUSSION: 1,
  TAB: 2,
} as const;
export type StaffGroup = (typeof StaffGroup)[keyof typeof StaffGroup];

export const TrillType = {
  TRILL_LINE: 0,
  UPPRALL_LINE: 1,
  DOWNPRALL_LINE: 2,
  PRALLPRALL_LINE: 3,
} as const;
export type TrillType = (typeof TrillType)[keyof typeof TrillType];

export const VibratoType = {
  NONE: -1,
  GUITAR_VIBRATO: 0,
  GUITAR_VIBRATO_WIDE: 1,
  VIBRATO_SAWTOOTH: 2,
  VIBRATO_SAWTOOTH_WIDE: 3,
} as const;
export type VibratoType = (typeof VibratoType)[keyof typeof VibratoType];

export const ArticulationTextType = {
  NO_TEXT: 0,
  SLAP: 1,
  POP: 2,
  TD: 3,
  BD: 4,
  RT: 5,
  PL: 6,
  SB: 7,
  VIB: 8,
} as const;
export type ArticulationTextType = (typeof ArticulationTextType)[keyof typeof ArticulationTextType];

export const LyricsSyllabic = {
  SINGLE: 0,
  BEGIN: 1,
  END: 2,
  MIDDLE: 3,
} as const;
export type LyricsSyllabic = (typeof LyricsSyllabic)[keyof typeof LyricsSyllabic];

export const LyricsDashSystemStart = {
  STANDARD: 0,
  UNDER_HEADER: 1,
  UNDER_FIRST_NOTE: 2,
} as const;
export type LyricsDashSystemStart = (typeof LyricsDashSystemStart)[keyof typeof LyricsDashSystemStart];

export const NoteLineEndPlacement = {
  LEFT_EDGE: 0,
  OFFSET_ENDS: 1,
} as const;
export type NoteLineEndPlacement = (typeof NoteLineEndPlacement)[keyof typeof NoteLineEndPlacement];

export const SpannerSegmentType = {
  SINGLE: 0,
  BEGIN: 1,
  MIDDLE: 2,
  END: 3,
} as const;
export type SpannerSegmentType = (typeof SpannerSegmentType)[keyof typeof SpannerSegmentType];

export const TiePlacement = {
  AUTO: 0,
  INSIDE: 1,
  OUTSIDE: 2,
} as const;
export type TiePlacement = (typeof TiePlacement)[keyof typeof TiePlacement];

export const TieDotsPlacement = {
  AUTO: 0,
  BEFORE_DOTS: 1,
  AFTER_DOTS: 2,
} as const;
export type TieDotsPlacement = (typeof TieDotsPlacement)[keyof typeof TieDotsPlacement];

export const TimeSigPlacement = {
  NORMAL: 0,
  ABOVE_STAVES: 1,
  ACROSS_STAVES: 2,
} as const;
export type TimeSigPlacement = (typeof TimeSigPlacement)[keyof typeof TimeSigPlacement];

export const TimeSigStyle = {
  NORMAL: 0,
  NARROW: 1,
  LARGE: 2,
} as const;
export type TimeSigStyle = (typeof TimeSigStyle)[keyof typeof TimeSigStyle];

export const TimeSigVSMargin = {
  HANG_INTO_MARGIN: 0,
  RIGHT_ALIGN_TO_BARLINE: 1,
  CREATE_SPACE: 2,
} as const;
export type TimeSigVSMargin = (typeof TimeSigVSMargin)[keyof typeof TimeSigVSMargin];

export const NoteSpellingType = {
  STANDARD: 0,
  GERMAN: 1,
  GERMAN_PURE: 2,
  SOLFEGGIO: 3,
  FRENCH: 4,
} as const;
export type NoteSpellingType = (typeof NoteSpellingType)[keyof typeof NoteSpellingType];

export const Key = {
  C_B: -7,
  G_B: -6,
  D_B: -5,
  A_B: -4,
  E_B: -3,
  B_B: -2,
  F: -1,
  C: 0,
  G: 1,
  D: 2,
  A: 3,
  E: 4,
  B: 5,
  F_S: 6,
  C_S: 7,
  DELTA_ENHARMONIC: 12,
} as const;
export type Key = (typeof Key)[keyof typeof Key];

export const PreferSharpFlat = {
  NONE: 0,
  SHARPS: 1,
  FLATS: 2,
  AUTO: 3,
} as const;
export type PreferSharpFlat = (typeof PreferSharpFlat)[keyof typeof PreferSharpFlat];

export const TransposeMode = {
  PLAYBACK_ONLY: 0,
  STANDARD_ONLY: 1,
  TAB_ONLY: 2,
} as const;
export type TransposeMode = (typeof TransposeMode)[keyof typeof TransposeMode];

export const UpdateMode = {
  DoNothing: 0,
  Update: 1,
  UpdateAll: 2,
  Layout: 3,
} as const;
export type UpdateMode = (typeof UpdateMode)[keyof typeof UpdateMode];

export const LayoutFlag = {
  NO_FLAGS: 0,
  PLAY_EVENTS: 2,
  REBUILD_MIDI_MAPPING: 4,
} as const;
export type LayoutFlag = (typeof LayoutFlag)[keyof typeof LayoutFlag];

export const OttavaType = {
  OTTAVA_8VA: 0,
  OTTAVA_8VB: 1,
  OTTAVA_15MA: 2,
  OTTAVA_15MB: 3,
  OTTAVA_22MA: 4,
  OTTAVA_22MB: 5,
} as const;
export type OttavaType = (typeof OttavaType)[keyof typeof OttavaType];

export const HairpinType = {
  INVALID: -1,
  CRESC_HAIRPIN: 0,
  DIM_HAIRPIN: 1,
  CRESC_LINE: 2,
  DIM_LINE: 3,
} as const;
export type HairpinType = (typeof HairpinType)[keyof typeof HairpinType];

export const TimeSigType = {
  NORMAL: 0,
  FOUR_FOUR: 1,
  ALLA_BREVE: 2,
  CUT_BACH: 3,
  CUT_TRIPLE: 4,
} as const;
export type TimeSigType = (typeof TimeSigType)[keyof typeof TimeSigType];
