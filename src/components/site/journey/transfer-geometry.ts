export type Anchor = { left: number; top: number; width: number; height: number };

/** Document coordinates keep the handoff reversible and independent of scroll speed. */
export function transferFrame(source: Anchor, target: Anchor, scrollY: number, viewportHeight: number) {
  const pinTop = Math.min(source.top, Math.max(32, (viewportHeight - Math.max(source.height, target.height)) / 2));
  const start = Math.max(0, source.top - pinTop);
  const end = Math.max(start + 1, target.top - pinTop);
  const progress = Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
  return {
    progress,
    x: (target.left - source.left) * progress,
    y: (target.top - source.top) * progress,
    scale: 1 + (target.width / source.width - 1) * progress,
    rotation: -4 + progress,
  };
}
