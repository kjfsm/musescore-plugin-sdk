export function trackToStaffIdx(track: number): number {
  return Math.floor(track / 4);
}

export function staffVoiceToTrack(staffIdx: number, voice: number): number {
  return staffIdx * 4 + voice;
}
