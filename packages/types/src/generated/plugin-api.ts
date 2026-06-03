// @kjfsm/musescore-plugin-sdk-types-generator が自動生成したファイル。手で編集しないこと。
// 再生成するにはリポジトリのルートで `pnpm generate:types` を実行する。


import type { AccidentalBracket, AccidentalRole, AccidentalType, AccidentalVal, AlignH, AlignV, ArpeggioType, ArticulationTextType, AutoCustomHide, AutoOnOff, BarLineType, BeamMode, BracketType, ChangeDirection, ChangeMethod, ChordLineType, ChordStylePreset, ClefToBarlinePosition, ClefType, CourtesyBarlineMode, DirectionH, DirectionV, DisplayCapoChordType, DurationType, DynamicSpeed, DynamicType, ElementType, FermataType, FontStyle, GlissandoStyle, GlissandoType, GradualTempoChangeType, HairpinType, HookType, InputStateMode, InstrumentLabelVisibility, IntervalStep, IntervalType, JumpType, Key, KeyMode, KeySigNatural, LHTappingShowItems, LHTappingSymbol, LayoutBreakType, LayoutFlag, LineType, LyricsDashSystemStart, LyricsSyllabic, MarkerType, MeasureNumberPlacement, NoteHeadGroup, NoteHeadScheme, NoteHeadType, NoteLineEndPlacement, NoteSpellingType, NoteType, Orientation, OrnamentShowAccidental, OrnamentStyle, OttavaType, Ownership, ParenthesesMode, PartialSpannerDirection, PlacementH, PlacementV, PlayEventType, PlayingTechniqueType, PreferSharpFlat, RHTappingSymbol, RepeatPlayCountPreset, RewindMode, SlurStyleType, SpannerSegmentType, StaffGroup, TappingHand, TextPlace, TextStyleType, TieDotsPlacement, TiePlacement, TimeSigPlacement, TimeSigStyle, TimeSigType, TimeSigVSMargin, TransposeMode, TremoloChordType, TremoloStyle, TremoloType, TrillType, UpdateMode, VeloType, VibratoType, VoiceAssignment } from "./enums.js";

export interface ScoreElement {
  readonly type: unknown;
  readonly name: string;
  readonly spatium: number;
  readonly eid: string;
  userName(): string;
  is(other: ScoreElement | null): boolean;
}

export interface QmlListAccess {
}

export interface Score extends ScoreElement {
  scoreName: string;
  readonly title: string;
  readonly composer: string;
  readonly lyricist: string;
  readonly duration: number;
  readonly mscoreVersion: string;
  readonly mscoreRevision: string;
  readonly style: MStyle | null;
  readonly keysig: Key;
  readonly npages: number;
  readonly pages: Page[];
  pageNumberOffset: number;
  readonly parts: Part[];
  readonly nstaves: number;
  readonly staves: Staff[];
  readonly ntracks: number;
  readonly systems: System[];
  readonly spanners: Spanner[];
  readonly hasHarmonies: boolean;
  readonly harmonyCount: number;
  readonly hasLyrics: boolean;
  readonly lyricCount: number;
  readonly lyrics: Lyrics[];
  readonly nmeasures: number;
  readonly firstMeasure: Measure | null;
  readonly firstMeasureMM: Measure | null;
  readonly lastMeasure: Measure | null;
  readonly lastMeasureMM: Measure | null;
  readonly lastSegment: Segment | null;
  layoutMode: number;
  showVerticalFrames: boolean;
  showInvisible: boolean;
  showUnprintable: boolean;
  showFrames: boolean;
  showPageborders: boolean;
  showSoundFlags: boolean;
  markIrregularMeasures: boolean;
  showInstrumentNames: boolean;
  readonly selection: Selection | null;
  readonly excerpts: Excerpt[];
  metaTag(tag: string): string;
  setMetaTag(tag: string, val: string): void;
  appendPart(instrumentId: string): void;
  appendPartByMusicXmlId(instrumentMusicXmlId: string): void;
  addRemoveSystemLocks(interval: number, lock: boolean): void;
  makeIntoSystem(first: MeasureBase | null, last: MeasureBase | null): void;
  extractLyrics(): string;
  appendMeasures(n: number): void;
  tick2measure(tick: Fraction | null): Measure | null;
  firstSegment(segmentType: number): Segment | null;
  findSegmentAtTick(types: number, tick: Fraction | null): Segment | null;
  addText(type: string, text: string): void;
  doLayout(startTick: Fraction | null, endTick: Fraction | null): void;
  replaceInstrument(part: Part | null, instrumentId: string): void;
  setPartVisible(part: Part | null, visible: boolean): void;
  setPartSharpFlat(part: Part | null, sharpFlat: number): void;
  setInstrumentName(part: Part | null, tick: Fraction | null, name: string): void;
  setInstrumentAbbreviature(part: Part | null, tick: Fraction | null, abbreviature: string): void;
  setStaffType(staff: Staff | null, staffTypeId: number): void;
  removeParts(parts: (Part | null)[]): void;
  removeStaves(staves: (Staff | null)[]): void;
  moveParts(sourceParts: (Part | null)[], destinationPart: Part | null, insertMode: number): void;
  moveStaves(sourceStaves: (Staff | null)[], destinationStaff: Staff | null, insertMode: number): void;
  addSystemObjects(staves: (Staff | null)[]): void;
  removeSystemObjects(staves: (Staff | null)[]): void;
  moveSystemObjects(sourceStaff: Staff | null, destinationStaff: Staff | null): void;
  appendStaff(destinationPart: Part | null): Staff | null;
  appendLinkedStaff(sourceStaff: Staff | null, destinationPart: Part | null): Staff | null;
  setVoiceVisible(staff: Staff | null, voiceIndex: number, visible: boolean): boolean;
  replaceDrumset(part: Part | null, tick: Fraction | null, drumset: Drumset | null): void;
  insertPart(instrumentId: string, index: number): void;
  replacePart(part: Part | null, instrumentId: string): void;
  setScoreOrder(orderId: string): void;
  newCursor(): Cursor | null;
  startCmd(qActionName: string): void;
  endCmd(rollback: boolean): void;
  showElementInScore(element: EngravingItem | null, staffIdx: number): void;
  createPlayEvents(): void;
}

export interface Cursor {
  track: number;
  staffIdx: number;
  staff: Staff | null;
  voice: number;
  filter: number;
  readonly tick: number;
  readonly utick: number;
  readonly fraction: Fraction | null;
  readonly tempo: number;
  readonly keySignature: number;
  score: Score | null;
  readonly element: EngravingItem | null;
  readonly segment: Segment | null;
  readonly measure: Measure | null;
  stringNumber: number;
  inputStateMode: InputStateMode;
  rewind(mode: RewindMode): void;
  rewindToTick(tick: number): void;
  rewindToFraction(f: Fraction | null): void;
  time(includeRepeats: boolean): number;
  next(): boolean;
  nextMeasure(): boolean;
  prev(): boolean;
  add(arg0: EngravingItem | null): void;
  addNote(pitch: number, addToChord: boolean): void;
  addRest(): void;
  addTuplet(ratio: Fraction | null, duration: Fraction | null): void;
  setDuration(z: number, n: number): void;
}

export interface EngravingItem extends ScoreElement {
  readonly parent: EngravingItem | null;
  readonly staff: Staff | null;
  readonly staffIdx: number;
  readonly effectiveStaffIdx: number;
  readonly vStaffIdx: number;
  offsetX: number;
  offsetY: number;
  readonly posX: number;
  readonly posY: number;
  readonly pos: QPointF;
  readonly pagePos: QPointF;
  readonly canvasPos: QPointF;
  readonly bbox: QRectF;
  readonly subtype: number;
  readonly up: boolean;
  readonly header: boolean;
  readonly trailer: boolean;
  readonly isMovable: boolean;
  readonly enabled: boolean;
  readonly addToSkyline: boolean;
  readonly fraction: Fraction | null;
  readonly beat: Fraction | null;
  readonly selected: boolean;
  readonly generated: boolean;
  subType: number;
  color: QColor;
  visible: boolean;
  z: number;
  small: boolean;
  hideStavesWhenIndividuallyEmpty: boolean;
  showCourtesy: boolean;
  articulationAnchor: number;
  pause: number;
  barlineSpanFrom: number;
  barlineSpanTo: number;
  barlineShowTips: boolean;
  offset: QPointF;
  ghost: boolean;
  play: boolean;
  boxAutoSize: boolean;
  leftMargin: number;
  rightMargin: number;
  topMargin: number;
  bottomMargin: number;
  autoscale: boolean;
  imageHeight: number;
  imageWidth: number;
  imageFramed: boolean;
  fretFrameTextScale: number;
  fretFrameDiagramScale: number;
  fretFrameChordPerRow: number;
  fretFrameHAlign: number;
  lockAspectRatio: boolean;
  sizeIsSpatium: boolean;
  userModified: boolean;
  beamNoSlope: boolean;
  crossStaffMove: number;
  tempoFollowText: boolean;
  tempoAlignRightOfRehearsalMark: boolean;
  accidentalBracket: AccidentalBracket;
  accidentalType: AccidentalType;
  stackingOrderOffset: number;
  fbprefix: number;
  fbdigit: number;
  fbsuffix: number;
  fbcontinuationline: number;
  fbparenthesis1: number;
  fbparenthesis2: number;
  fbparenthesis3: number;
  fbparenthesis4: number;
  fbparenthesis5: number;
  ottavaType: OttavaType;
  numbersOnly: boolean;
  trillType: TrillType;
  vibratoType: VibratoType;
  hairpinCircledTip: boolean;
  hairpinType: HairpinType;
  veloChange: number;
  singleNoteDynamics: boolean;
  mmRestRangeBracketType: BracketType;
  velocity: number;
  markerType: MarkerType;
  musicSymbolSize: number;
  markerCenterOnSymbol: boolean;
  arpUserLen1: number;
  arpUserLen2: number;
  glissType: GlissandoType;
  glissShowText: boolean;
  glissEaseIn: number;
  glissEaseOut: number;
  diagonal: boolean;
  timeStretch: number;
  ornamentShowAccidental: OrnamentShowAccidental;
  startOnUpperNote: boolean;
  timesigType: TimeSigType;
  mmRestNumberVisible: boolean;
  verse: number;
  lineVisible: boolean;
  mag: number;
  useDrumset: number;
  track: number;
  fretStrings: number;
  fretFrets: number;
  showNut: boolean;
  fretOffset: number;
  fretNumPos: number;
  fretShowFingering: boolean;
  harmonyVoiceLiteral: boolean;
  harmonyDoNotStackModifiers: boolean;
  systemBracket: BracketType;
  gap: boolean;
  autoplace: boolean;
  dashLineLen: number;
  dashGapLen: number;
  playRepeats: boolean;
  createSystemHeader: boolean;
  staffLines: number;
  stepOffset: number;
  staffShowBarlines: boolean;
  staffShowLedgerlines: boolean;
  staffStemless: boolean;
  staffInvisible: boolean;
  staffColor: QColor;
  staffGenClef: boolean;
  staffGenTimesig: boolean;
  staffGenKeysig: boolean;
  bracketSpan: number;
  bracketColumn: number;
  inameLayoutPosition: InstrumentLabelVisibility;
  fontSize: number;
  fontStyle: FontStyle;
  lineSpacing: number;
  frameType: number;
  frameRound: number;
  frameFgColor: QColor;
  frameBgColor: QColor;
  sizeSpatiumDependent: boolean;
  textSizeSpatiumDependent: boolean;
  musicalSymbolsScale: number;
  textScriptAlign: number;
  systemFlag: boolean;
  beginFontSize: number;
  beginFontStyle: FontStyle;
  beginTextOffset: QPointF;
  continueFontSize: number;
  continueFontStyle: FontStyle;
  continueTextOffset: QPointF;
  endFontSize: number;
  endFontStyle: FontStyle;
  endTextOffset: QPointF;
  avoidBarLines: boolean;
  dynamicsSize: number;
  centerOnNotehead: boolean;
  anchorToEndOfPrevious: boolean;
  snapToDynamics: boolean;
  snapBefore: boolean;
  snapAfter: boolean;
  locationStaves: number;
  locationVoices: number;
  locationMeasures: number;
  locationGrace: number;
  locationNote: number;
  voice: number;
  clefToBarlinePos: number;
  isHeader: boolean;
  concertKey: Key;
  actualKey: Key;
  arpeggioType: ArpeggioType;
  chordLineType: ChordLineType;
  chordLineStraight: boolean;
  chordLineWavy: boolean;
  tremoloType: TremoloType;
  tremoloStrokeStyle: TremoloStyle;
  harmonyType: number;
  arpeggioSpan: number;
  bracketHookPos: number;
  bracketRightSide: boolean;
  bendType: number;
  bendVertexOffset: QPointF;
  bendShowHoldLine: number;
  bendStartTimeFactor: number;
  bendEndTimeFactor: number;
  guitarDiveTabPos: number;
  guitarBendAmount: number;
  vibratoLineType: number;
  guitarDiveIsSlack: boolean;
  tremoloBarType: number;
  startWithLongNames: boolean;
  startWithMeasureOne: boolean;
  firstSystemIndentation: boolean;
  preferSharpFlat: number;
  tempoChangeFactor: number;
  isDiagram: boolean;
  active: boolean;
  fretPosition: number;
  generateText: boolean;
  transposeMode: number;
  positionLinkedToMaster: boolean;
  appearanceLinkedToMaster: boolean;
  textLinkedToMaster: boolean;
  excludeFromParts: boolean;
  stringsCount: number;
  symbolsSize: number;
  symbolAngle: number;
  applyToAllStaves: boolean;
  isCourtesy: boolean;
  excludeVerticalAlign: boolean;
  alignWithOtherRests: boolean;
  mirrorHead: DirectionH;
  hasParentheses: boolean;
  barlineType: BarLineType;
  barlineSpan: boolean;
  boxHeight: number;
  boxWidth: number;
  topGap: number;
  bottomGap: number;
  paddingToNotationAbove: number;
  paddingToNotationBelow: number;
  layoutBreakType: LayoutBreakType;
  size: QSizeF;
  fretFrameColumnGap: number;
  fretFrameRowGap: number;
  fretFrameDiagramsOrder: unknown;
  scale: QSizeF;
  text: string;
  htmlText: string;
  beamPos: unknown;
  userLen: number;
  space: number;
  tempo: number;
  numeratorString: string;
  denominatorString: string;
  hairpinHeight: number;
  hairpinContHeight: number;
  veloChangeMethod: ChangeMethod;
  veloChangeSpeed: number;
  dynamicType: DynamicType;
  changeMethod: ChangeMethod;
  placement: PlacementV;
  hPlacement: PlacementH;
  jumpTo: string;
  playUntil: string;
  continueAt: string;
  label: string;
  glissText: string;
  glissandoStyle: GlissandoStyle;
  groups: unknown;
  lineStyle: LineType;
  lineColor: QColor;
  lineWidth: number;
  ornamentStyle: OrnamentStyle;
  intervalAbove: unknown;
  intervalBelow: unknown;
  ornamentShowCueNote: number;
  timesig: Fraction | null;
  timesigStretch: Fraction | null;
  mmRestNumberPos: number;
  mmRestNumberOffset: QPointF;
  measureRepeatNumberPos: number;
  volta_ending: unknown;
  role: number;
  orientation: Orientation;
  fretFingering: number;
  harmonyVoicing: number;
  harmonyDuration: number;
  harmonyBassScale: number;
  symbol: number;
  lineDistance: number;
  headScheme: NoteHeadScheme;
  staffYoffset: number;
  subStyle: TextStyleType;
  fontFace: string;
  frameWidth: number;
  framePadding: number;
  align: number;
  beginText: string;
  beginTextAlign: number;
  beginTextPosition: unknown;
  beginTextPlace: TextPlace;
  beginHookType: HookType;
  beginHookHeight: number;
  beginLineArrowHeight: unknown;
  beginLineArrowWidth: unknown;
  beginFilledArrowHeight: unknown;
  beginFilledArrowWidth: unknown;
  beginFontFace: string;
  gapBetweenTextAndLine: number;
  continueText: string;
  continueTextAlign: number;
  continueTextPosition: unknown;
  continueTextPlace: TextPlace;
  continueFontFace: string;
  endText: string;
  endTextAlign: number;
  endTextPosition: unknown;
  endTextPlace: TextPlace;
  endHookType: HookType;
  endHookHeight: number;
  endLineArrowHeight: unknown;
  endLineArrowWidth: unknown;
  endFilledArrowHeight: unknown;
  endFilledArrowWidth: unknown;
  endFontFace: string;
  notelinePlacement: NoteLineEndPlacement;
  voiceAssignment: VoiceAssignment;
  centerBetweenStaves: number;
  posAbove: QPointF;
  locationFractions: unknown;
  position: unknown;
  concertClefType: ClefType;
  transposingClefType: ClefType;
  action: string;
  minDistance: number;
  bracketHookLength: unknown;
  bendCurve: unknown;
  tremoloBarCurve: unknown;
  path: unknown;
  playTechType: PlayingTechniqueType;
  tempoChangeType: GradualTempoChangeType;
  tempoEasingMethod: ChangeMethod;
  ignoredStrings: unknown;
  tiePlacement: TiePlacement;
  minLength: unknown;
  partialSpannerDirection: PartialSpannerDirection;
  preset: string;
  visibleStrings: unknown;
  scoreFont: string;
  playCountTextSetting: number;
  playCountText: string;
  clone(): EngravingItem | null;
  subtypeName(): string;
  _name(): string;
}

export interface Note extends EngravingItem {
  readonly accidental: EngravingItem | null;
  accidentalType: AccidentalType;
  readonly dots: EngravingItem[];
  readonly elements: EngravingItem[];
  readonly playEvents: PlayEvent[];
  readonly spannerForward: EngravingItem[];
  readonly spannerBack: EngravingItem[];
  readonly tieBack: Tie | null;
  readonly tieForward: Tie | null;
  readonly firstTiedNote: Note | null;
  readonly lastTiedNote: Note | null;
  readonly noteType: NoteType;
  tpc: number;
  readonly isTrillCueNote: boolean;
  pitch: number;
  tpc1: number;
  tpc2: number;
  userVelocity: number;
  tuning: number;
  line: number;
  fixed: boolean;
  fixedLine: number;
  fret: number;
  string: number;
  dead: boolean;
  dotPosition: DirectionV;
  veloType: VeloType;
  createPlayEvent(): PlayEvent | null;
  add(wrapped: EngravingItem | null): void;
  remove(wrapped: EngravingItem | null): void;
}

export interface DurationElement extends EngravingItem {
  duration: Fraction | null;
  readonly globalDuration: Fraction | null;
  readonly actualDuration: Fraction | null;
  readonly tuplet: Tuplet | null;
  readonly topTuplet: Tuplet | null;
  readonly measure: Measure | null;
}

export interface Tuplet extends DurationElement {
  readonly hasBracket: boolean;
  readonly defaultP1: QPointF;
  readonly defaultP2: QPointF;
  readonly elements: EngravingItem[];
  readonly actualNotes: number;
  readonly normalNotes: number;
  numberType: number;
  bracketType: BracketType;
  p1: QPointF;
  p2: QPointF;
}

export interface ChordRest extends DurationElement {
  readonly lyrics: Lyrics[];
  readonly beam: Beam | null;
  readonly isFullMeasureRest: boolean;
  readonly elements: EngravingItem[];
  staffMove: number;
  durationTypeWithDots: unknown;
  beamMode: BeamMode;
  actualBeamMode(beamRests: boolean): number;
}

export interface Chord extends ChordRest {
  readonly graceNotes: Chord[];
  readonly graceNotesBefore: Chord[];
  readonly graceNotesAfter: Chord[];
  readonly notes: Note[];
  readonly articulations: EngravingItem[];
  readonly stem: EngravingItem | null;
  readonly stemSlash: EngravingItem | null;
  readonly hook: EngravingItem | null;
  readonly noteType: NoteType;
  playEventType: PlayEventType;
  readonly isTrillCueNote: boolean;
  readonly upNote: Note | null;
  readonly downNote: Note | null;
  readonly arpeggio: EngravingItem | null;
  readonly spanArpeggio: EngravingItem | null;
  readonly tremoloSingleChord: EngravingItem | null;
  readonly tremoloTwoChord: EngravingItem | null;
  showStemSlash: boolean;
  noStem: boolean;
  combineVoice: number;
  add(wrapped: EngravingItem | null): void;
  remove(wrapped: EngravingItem | null): void;
}

export interface Beam extends EngravingItem {
  readonly isCrossStaff: boolean;
  readonly isFullCrossStaff: boolean;
  readonly defaultCrossStaffIdx: number;
  readonly minCRMove: number;
  readonly maxCRMove: number;
  readonly elements: ChordRest[];
  growLeft: number;
  growRight: number;
}

export interface Segment extends EngravingItem {
  readonly annotations: EngravingItem[];
  readonly nextInMeasure: Segment | null;
  readonly next: Segment | null;
  readonly prevInMeasure: Segment | null;
  readonly prev: Segment | null;
  readonly segmentType: number;
  readonly tick: number;
  readonly fraction: Fraction | null;
  leadingSpace: number;
  elementAt(track: number): EngravingItem | null;
}

export interface MeasureBase extends EngravingItem {
  readonly no: number;
  readonly tick: Fraction | null;
  readonly ticks: Fraction | null;
  readonly elements: EngravingItem[];
  readonly nextMeasure: Measure | null;
  readonly nextMeasureMM: Measure | null;
  readonly prevMeasure: Measure | null;
  readonly prevMeasureMM: Measure | null;
  readonly next: MeasureBase | null;
  readonly nextMM: MeasureBase | null;
  readonly prev: MeasureBase | null;
  readonly prevMM: MeasureBase | null;
  repeatEnd: boolean;
  repeatStart: boolean;
  repeatJump: boolean;
  noOffset: number;
  irregular: boolean;
  add(wrapped: EngravingItem | null): void;
  remove(wrapped: EngravingItem | null): void;
}

export interface Measure extends Omit<MeasureBase, "visible"> {
  readonly firstSegment: Segment | null;
  readonly lastSegment: Segment | null;
  readonly showsMeasureNumberInAutoMode: boolean;
  readonly mmRest: Measure | null;
  readonly isMMRestStart: boolean;
  readonly segments: Segment[];
  measureNumberMode: MeasureNumberPlacement;
  breakMmr: boolean;
  repeatCount: number;
  userStretch: number;
  timesigNominal: Fraction | null;
  timesigActual: Fraction | null;
  vspacerUp(staffIdx: number): EngravingItem | null;
  vspacerDown(staffIdx: number): EngravingItem | null;
  measureNumber(staffIdx: number): EngravingItem | null;
  mmRangeText(staffIdx: number): EngravingItem | null;
  corrupted(staffIdx: number): boolean;
  visible(staffIdx: number): boolean;
  stemless(staffIdx: number): boolean;
}

export interface System extends Omit<EngravingItem, "bbox"> {
  readonly measures: MeasureBase[];
  readonly firstMeasure: Measure | null;
  readonly lastMeasure: Measure | null;
  readonly first: MeasureBase | null;
  readonly last: MeasureBase | null;
  isLocked: boolean;
  readonly pageBreak: boolean;
  readonly systemDividerLeft: EngravingItem | null;
  readonly systemDividerRight: EngravingItem | null;
  bbox(staffIdx: number): QRectF;
  yOffset(staffIdx: number): number;
  show(staffIdx: number): boolean;
  setHideStaffIfEmpty(staffIdx: number, hide: number): void;
}

export interface Page extends EngravingItem {
  readonly pageNumber: number;
  readonly pagenumber: number;
  readonly systems: System[];
}

export interface Ornament extends EngravingItem {
  readonly hasIntervalAbove: boolean;
  readonly hasIntervalBelow: boolean;
  readonly showCueNote: boolean;
  readonly accidentalAbove: EngravingItem | null;
  readonly accidentalBelow: EngravingItem | null;
}

export interface Staff extends Omit<ScoreElement, "spatium"> {
  readonly part: Part | null;
  readonly idx: number;
  readonly show: boolean;
  readonly primaryStaff: Staff | null;
  readonly brackets: EngravingItem[];
  small: boolean;
  mag: number;
  color: QColor;
  playbackVoice1: boolean;
  playbackVoice2: boolean;
  playbackVoice3: boolean;
  playbackVoice4: boolean;
  showIfEntireSystemEmpty: boolean;
  staffBarlineSpan: number;
  staffBarlineSpanFrom: number;
  staffBarlineSpanTo: number;
  staffInvisible: boolean;
  staffUserdist: number;
  visible: boolean;
  cutaway: boolean;
  hideSystemBarLine: boolean;
  reflectTranspositionInLinkedTab: boolean;
  showMeasureNumbers: number;
  mergeMatchingRests: unknown;
  clefType(tick: Fraction | null): number;
  timeStretch(tick: Fraction | null): Fraction | null;
  timeSig(tick: Fraction | null): EngravingItem | null;
  key(tick: Fraction | null): number;
  transpose(tick: Fraction | null): IntervalWrapper | null;
  swing(tick: Fraction | null): Record<string, unknown>;
  capo(tick: Fraction | null): Record<string, unknown>;
  stemless(tick: Fraction | null): boolean;
  staffHeight(tick: Fraction | null): number;
  isPitchedStaff(tick: Fraction | null): boolean;
  isTabStaff(tick: Fraction | null): boolean;
  isDrumStaff(tick: Fraction | null): boolean;
  lines(tick: Fraction | null): number;
  lineDistance(tick: Fraction | null): number;
  isLinesInvisible(tick: Fraction | null): boolean;
  middleLine(tick: Fraction | null): number;
  bottomLine(tick: Fraction | null): number;
  staffMag(tick: Fraction | null): number;
  spatium(tick: Fraction | null): number;
  pitchOffset(tick: Fraction | null): number;
  isVoiceVisible(voice: number): boolean;
}

export interface SpannerSegment extends EngravingItem {
  readonly spanner: Spanner | null;
  readonly spannerSegmentType: SpannerSegmentType;
  readonly pos2: QPointF;
  userOff2: QPointF;
  slurUoff1: QPointF;
  slurUoff2: QPointF;
  slurUoff3: QPointF;
  slurUoff4: QPointF;
}

export interface Spanner extends EngravingItem {
  readonly startElement: EngravingItem | null;
  readonly endElement: EngravingItem | null;
  readonly spannerSegments: SpannerSegment[];
  readonly ornament: Ornament | null;
  spannerTrack2: number;
  anchor: number;
  spannerTick: Fraction | null;
  spannerTicks: Fraction | null;
}

export interface Tie extends Spanner {
  readonly startNote: Note | null;
  readonly endNote: Note | null;
  readonly isInside: boolean;
}

export interface Lyrics extends EngravingItem {
  readonly plainText: string;
  readonly isMelisma: boolean;
  readonly separator: EngravingItem | null;
  syllabic: LyricsSyllabic;
  lyricTicks: Fraction | null;
}

export interface InstrumentListProperty {
}

export interface Part extends ScoreElement {
  readonly startTrack: number;
  readonly endTrack: number;
  readonly instrumentId: string;
  readonly musicXmlId: string;
  readonly harmonyCount: number;
  readonly hasChordSymbol: boolean;
  readonly hasDrumStaff: boolean;
  readonly hasPitchedStaff: boolean;
  readonly hasTabStaff: boolean;
  readonly lyricCount: number;
  readonly midiChannel: number;
  readonly midiProgram: number;
  readonly longName: string;
  readonly shortName: string;
  readonly partName: string;
  show: boolean;
  readonly instruments: Instrument[];
  readonly staves: Staff[];
  readonly masterPart: Part | null;
  instrumentAtTick(tick: number): Instrument | null;
  instrumentAtTick(tick: Fraction | null): Instrument | null;
  longNameAtTick(tick: Fraction | null): string;
  shortNameAtTick(tick: Fraction | null): string;
  instrumentNameAtTick(tick: Fraction | null): string;
  instrumentIdAtTick(tick: Fraction | null): string;
  currentHarpDiagramAtTick(tick: Fraction | null): EngravingItem | null;
  nextHarpDiagramFromTick(tick: Fraction | null): EngravingItem | null;
  prevHarpDiagramFromTick(tick: Fraction | null): EngravingItem | null;
  tickOfCurrentHarpDiagram(tick: Fraction | null): Fraction | null;
}

export interface Channel {
  readonly name: string;
  readonly isHarmonyChannel: boolean;
  volume: number;
  pan: number;
  chorus: number;
  reverb: number;
  mute: boolean;
  midiProgram: number;
  midiBank: number;
}

export interface StringData {
  readonly strings: unknown[];
  readonly frets: number;
}

export interface Drumset {
  isValid(pitch: number): boolean;
  noteHead(pitch: number): number;
  noteHeads(pitch: number, type: number): number;
  line(pitch: number): number;
  voice(pitch: number): number;
  stemDirection(pitch: number): number;
  name(pitch: number): string;
  translatedName(pitch: number): string;
  shortcut(pitch: number): string;
  variants(pitch: number): unknown[];
  panelRow(pitch: number): number;
  panelColumn(pitch: number): number;
  defaultPitchForLine(line: number): number;
  nextPitch(pitch: number): number;
  prevPitch(pitch: number): number;
  setName(pitch: number, name: string): void;
  setNoteHead(pitch: number, noteHead: number): void;
  setLine(pitch: number, line: number): void;
  setVoice(pitch: number, voice: number): void;
  setStemDirection(pitch: number, stemDirection: number): void;
  setShortcut(pitch: number, shortcut: string): void;
  is(other: Drumset | null): boolean;
}

export interface ChannelListProperty {
}

export interface Instrument {
  readonly instrumentId: string;
  readonly musicXmlId: string;
  readonly longName: string;
  readonly shortName: string;
  readonly stringData: StringData | null;
  readonly drumset: Drumset | null;
  readonly channels: Channel[];
  cloneDrumset(): Drumset | null;
  is(other: Instrument | null): boolean;
}

export interface Excerpt {
  readonly partScore: Score | null;
  readonly title: string;
  is(other: Excerpt | null): boolean;
}

export interface QmlExcerptsListAccess {
}

export interface Selection {
  readonly elements: EngravingItem[];
  readonly isRange: boolean;
  readonly startSegment: Segment | null;
  readonly endSegment: Segment | null;
  readonly startStaff: number;
  readonly endStaff: number;
  select(e: EngravingItem | null, add: boolean): boolean;
  selectRange(startTick: number, endTick: number, startStaff: number, endStaff: number): boolean;
  deselect(e: EngravingItem | null): boolean;
  clear(): boolean;
}

export interface PlayEvent {
  pitch: number;
  ontime: number;
  len: number;
  readonly offtime: number;
}

export interface QmlPlayEventsListAccess {
}

export interface MStyle {
  value(key: string): unknown;
  setValue(key: string, value: unknown): void;
  resetValue(key: string): void;
}

export interface Fraction {
  readonly numerator: number;
  readonly denominator: number;
  readonly ticks: number;
  readonly str: string;
  readonly real: number;
  readonly reduced: Fraction | null;
  readonly inverse: Fraction | null;
  readonly absValue: Fraction | null;
  plus(other: Fraction | null): Fraction | null;
  minus(other: Fraction | null): Fraction | null;
  times(other: Fraction | null): Fraction | null;
  times(v: number): Fraction | null;
  dividedBy(other: Fraction | null): Fraction | null;
  dividedBy(v: number): Fraction | null;
  greaterThan(other: Fraction | null): boolean;
  lessThan(other: Fraction | null): boolean;
  equals(other: Fraction | null): boolean;
  identical(other: Fraction | null): boolean;
}

export interface OrnamentIntervalWrapper {
  readonly step: IntervalStep;
  readonly type: IntervalType;
  readonly isPerfect: boolean;
}

export interface IntervalWrapper {
  readonly diatonic: number;
  readonly chromatic: number;
  readonly isZero: boolean;
  flip(): void;
}

// Plugin API から参照されているがモデル化されていない補助型。
export type QColor = string;
export type QPointF = { x: number; y: number };
export type QRectF = { x: number; y: number; width: number; height: number };
export type QSizeF = { width: number; height: number };

export type PluginApiClassName = "Beam" | "Channel" | "ChannelListProperty" | "Chord" | "ChordRest" | "Cursor" | "Drumset" | "DurationElement" | "EngravingItem" | "Excerpt" | "Fraction" | "Instrument" | "InstrumentListProperty" | "IntervalWrapper" | "Lyrics" | "MStyle" | "Measure" | "MeasureBase" | "Note" | "Ornament" | "OrnamentIntervalWrapper" | "Page" | "Part" | "PlayEvent" | "QmlExcerptsListAccess" | "QmlListAccess" | "QmlPlayEventsListAccess" | "Score" | "ScoreElement" | "Segment" | "Selection" | "Spanner" | "SpannerSegment" | "Staff" | "StringData" | "System" | "Tie" | "Tuplet";
