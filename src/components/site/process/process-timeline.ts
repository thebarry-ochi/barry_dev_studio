/** Four resting poses, with a short scrubbed blend between each pair. */
export function processPosition(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress));
  const position = clamped * 3;
  const from = Math.floor(position);
  const to = Math.min(3, from + 1);
  const mix = Math.max(0, Math.min(1, (position - from - 0.35) / 0.3));
  return { progress: clamped, from, to, mix, active: mix < 0.5 ? from : to };
}

export function processStageScroll(index: number, start: number, distance: number) {
  return start + Math.max(0, Math.min(3, index)) / 3 * Math.max(0, distance);
}

/** Reserve a final resting interval after Deliver, before the pinned section releases. */
export function processScrollDistance(sectionHeight: number, pinHeight: number, overlapHeight = 0, holdHeight = 0) {
  return Math.max(1, sectionHeight - pinHeight - Math.max(0, overlapHeight) - Math.max(0, holdHeight));
}
