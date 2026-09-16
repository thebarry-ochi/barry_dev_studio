import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { test } from "node:test";
import { kifaruDestinations, kifaruGeometry as g, kifaruHeroImage } from "../src/components/graphics/kifaru/kifaru-system.ts";

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
  const assets = [kifaruHeroImage, ...kifaruDestinations.map(({ image }) => image)];
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
