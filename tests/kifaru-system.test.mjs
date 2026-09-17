import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { test } from "node:test";
import { kifaruDestinations, kifaruGeometry as g, kifaruHeroImage, kifaruSketchImage } from "../src/components/graphics/kifaru/kifaru-system.ts";

function contains(outer, inner) {
  return inner.x >= outer.x && inner.y >= outer.y &&
    inner.x + inner.width <= outer.x + outer.width &&
    inner.y + inner.height <= outer.y + outer.height;
}
function overlaps(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x &&
    a.y < b.y + b.height && a.y + a.height > b.y;
}

test("the shared page slots remain inside the artboard and do not collide", () => {
  assert.ok(contains(g.artboard, g.browser));
  assert.ok(contains(g.browser, g.page));
  const slots = [g.navigation, g.heroCopy, g.heroImage, g.cta, g.cardsHeading];
  for (const slot of slots) assert.ok(contains(g.page, slot), JSON.stringify(slot));
  for (let i = 0; i < slots.length; i++) {
    for (let j = i + 1; j < slots.length; j++) assert.equal(overlaps(slots[i], slots[j]), false);
  }
  assert.equal(g.browserBar.y + g.browserBar.height, g.page.y, "chrome must extend above content instead of shifting it");
});

test("destination cards have equal geometry, a readable label slot, and no overlap", () => {
  const cards = kifaruDestinations.map(({ x }) => ({ x, y: g.cardImageY, width: g.cardImageWidth, height: g.cardLabelY - g.cardImageY + 4 }));
  assert.ok(g.cardLabelY >= g.cardImageY + g.cardImageHeight + 12);
  assert.equal(new Set(kifaruDestinations.map(({ key }) => key)).size, cards.length);
  assert.equal(new Set(kifaruDestinations.map(({ image }) => image)).size, cards.length);
  cards.forEach((card, index) => {
    assert.ok(contains(g.page, card));
    if (index) assert.equal(overlaps(cards[index - 1], card), false);
  });
});

test("every referenced photograph exists as WebP within the artwork byte budget", () => {
  const assets = [kifaruHeroImage, kifaruSketchImage, ...kifaruDestinations.map(({ image }) => image)];
  let total = 0;
  for (const asset of assets) {
    const file = new URL(`../public${asset}`, import.meta.url);
    const bytes = readFileSync(file);
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
    assert.ok(statSync(file).size < 100_000, `${asset} should stay below 100KB`);
    total += bytes.length;
  }
  assert.ok(total < 180_000, `combined assets should stay below 180KB, got ${total}`);
});

// The handoff must coincide exactly with both static layouts, including reverse scroll.
const { transferFrame } = await import('../src/components/site/journey/transfer-geometry.ts');
test('transfer clamps at both anchors and pins between them', () => {
  const source = { left: 740, top: 200, width: 560, height: 472.5 };
  const target = { left: 730, top: 950, width: 580, height: 489.375 };
  const start = transferFrame(source, target, 0, 800);
  assert.equal(start.progress, 0);
  assert.ok(Math.abs(start.x) < 0.001);
  assert.equal(start.y, 0);
  assert.equal(start.scale, 1);
  const end = transferFrame(source, target, 2000, 800);
  assert.equal(end.progress, 1);
  assert.equal(source.left + end.x, target.left);
  assert.equal(source.top + end.y, target.top);
  assert.equal(source.width * end.scale, target.width);
  assert.equal(end.rotation, -3);
  const first = transferFrame(source, target, 300, 800);
  const second = transferFrame(source, target, 500, 800);
  assert.ok(Math.abs((source.top + first.y - 300) - (source.top + second.y - 500)) < 0.001);
  assert.deepEqual(transferFrame(source, target, 300, 800), first);
});

test('transfer remains pinned on tall viewports with no initial scroll runway', () => {
  const source = { left: 700, top: 100, width: 500, height: 421.875 };
  const target = { left: 710, top: 900, width: 510, height: 430.3125 };
  for (const scroll of [0, 100, 400, 799]) {
    const pose = transferFrame(source, target, scroll, 1200);
    assert.ok(Math.abs(source.top + pose.y - scroll - 100) < 0.001);
  }
});

const { processPosition, processStageScroll } = await import('../src/components/site/process/process-timeline.ts');
test('Process timeline has four stable resting stages and bounded reversible blends', () => {
  for (let index = 0; index < 4; index++) {
    const pose = processPosition(index / 3);
    assert.equal(pose.active, index);
    assert.equal(pose.mix, 0);
    assert.equal(processStageScroll(index, 800, 2700), 800 + index * 900);
  }
  for (const progress of [-2, 0, 0.1, 0.1666666667, 0.5, 0.83, 1, 5]) {
    const pose = processPosition(progress);
    assert.ok(pose.mix >= 0 && pose.mix <= 1);
    assert.ok(pose.active >= 0 && pose.active <= 3);
    assert.deepEqual(processPosition(progress), pose);
  }
  const blend = processPosition(1 / 6);
  assert.equal(blend.from, 0);
  assert.equal(blend.to, 1);
  assert.ok(Math.abs(blend.mix - 0.5) < 0.0001);
  assert.equal(processPosition(-1).active, 0);
  assert.equal(processPosition(2).active, 3);
});

const { processScrollDistance } = await import('../src/components/site/process/process-timeline.ts');
test('Work cover travel starts after Deliver without stretching the four-stage timeline', () => {
  const viewport = 900;
  const original = processScrollDistance(4 * viewport, viewport);
  const withOverlap = processScrollDistance(5 * viewport, viewport, viewport);
  assert.equal(original, 2700);
  assert.equal(withOverlap, original);
  const deliver = processStageScroll(3, 816, withOverlap);
  const workTop = 816 + 5 * viewport - viewport;
  assert.equal(workTop - deliver, viewport, 'Work begins below the viewport at Deliver');
  assert.equal(workTop - (816 + 5 * viewport - viewport), 0, 'sticky release coincides with full coverage');
  assert.equal(processScrollDistance(400, 900, 900), 1);
});
