import {
  getNoteTypeName,
  isChord,
  isRest,
  iterateMeasureSegments,
  iterateMeasures,
} from "@kjfsm/musescore-plugin-sdk-helpers";
import { NoteType } from "@kjfsm/musescore-plugin-sdk-types";
import type { Chord, Note, Score } from "@kjfsm/musescore-plugin-sdk-types";

// Note.pitch is available at runtime but absent from generated types
type NoteWithPitch = Note & { readonly pitch: number };

const PITCH_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

export function midiToName(pitch: number): string {
  const octave = Math.floor(pitch / 12) - 1;
  return `${PITCH_NAMES[pitch % 12] ?? "?"}${octave}`;
}

function fractionStr(frac: { str: string } | null | undefined): string {
  return frac?.str ?? "?";
}

export interface StructureElement {
  type: "Chord" | "Rest";
  dur: string;
  notes?: string[];
  noteType?: string;
}

export interface VoiceInfo {
  voice: number;
  elements: StructureElement[];
}

export interface StaveInfo {
  staffIdx: number;
  voices: VoiceInfo[];
}

export interface MeasureInfo {
  measure: number;
  staves: StaveInfo[];
}

export interface PartInfo {
  name: string;
  shortName: string;
  instrumentId: string;
  nstaves: number;
}

export interface ScoreMeta {
  title: string;
  composer: string;
  lyricist: string;
  nstaves: number;
  nmeasures: number;
  ntracks: number;
  durationSec: number;
}

export interface ScoreStructure {
  score: ScoreMeta;
  parts: PartInfo[];
  measures: MeasureInfo[];
}

export function buildStructure(score: Score | null): string {
  if (!score) {
    return JSON.stringify({ error: "no score is open" }, null, 2);
  }

  const meta: ScoreMeta = {
    title: score.title || score.metaTag("workTitle") || "(untitled)",
    composer: score.composer || score.metaTag("composer") || "",
    lyricist: score.lyricist || score.metaTag("lyricist") || "",
    nstaves: score.nstaves,
    nmeasures: score.nmeasures,
    ntracks: score.ntracks,
    durationSec: score.duration,
  };

  const parts: PartInfo[] = score.parts.map((p) => ({
    name: p.partName || p.longName || "",
    shortName: p.shortName || "",
    instrumentId: p.instrumentId || "",
    nstaves: p.staves.length,
  }));

  const measures: MeasureInfo[] = [];
  let measureIdx = 0;

  for (const measure of iterateMeasures(score)) {
    measureIdx++;
    const staves: StaveInfo[] = [];

    for (let staffIdx = 0; staffIdx < score.nstaves; staffIdx++) {
      const voiceMap = new Map<number, StructureElement[]>();

      for (const seg of iterateMeasureSegments(measure)) {
        for (let voice = 0; voice < 4; voice++) {
          const track = staffIdx * 4 + voice;
          const el = seg.elementAt(track);
          if (!el) continue;

          let entry: StructureElement | undefined;

          if (isChord(el)) {
            const chord = el as Chord;
            entry = {
              type: "Chord",
              dur: fractionStr(chord.duration),
              notes: chord.notes.map((n) => midiToName((n as NoteWithPitch).pitch)),
              ...(chord.noteType !== NoteType.NORMAL && {
                noteType: getNoteTypeName(chord.noteType),
              }),
            };
          } else if (isRest(el)) {
            entry = { type: "Rest", dur: fractionStr(el.duration) };
          }

          if (entry !== undefined) {
            const arr = voiceMap.get(voice) ?? [];
            arr.push(entry);
            voiceMap.set(voice, arr);
          }
        }
      }

      if (voiceMap.size > 0) {
        const voices = [...voiceMap.entries()]
          .sort(([a], [b]) => a - b)
          .map(([voice, elements]) => ({ voice, elements }));
        staves.push({ staffIdx, voices });
      }
    }

    measures.push({ measure: measureIdx, staves });
  }

  const structure: ScoreStructure = { score: meta, parts, measures };
  return JSON.stringify(structure, null, 2);
}

export function run(score: Score | null): void {
  const json = buildStructure(score);
  console.log(json);
}
