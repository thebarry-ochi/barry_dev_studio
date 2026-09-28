export type TransferAnchor = { left: number; top: number; width: number; height: number };

/** Anchors are viewport positions at departure and arrival, not document offsets. */
export function transferFrame(
  source: TransferAnchor,
  target: TransferAnchor,
  scroll: number,
  start: number,
  end: number,
) {
  const progress = Math.min(1, Math.max(0, (scroll - start) / Math.max(1, end - start)));
  return {
    progress,
    left: source.left + (target.left - source.left) * progress,
    top: source.top + (target.top - source.top) * progress,
    scale: 1 + (target.width / source.width - 1) * progress,
    rotation: -5 + progress,
  };
}
