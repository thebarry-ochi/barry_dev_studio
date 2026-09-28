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
  const assets = [kifaruHeroImage, kifaruSketchImage, "/assets/kifaru/sketch-safari-dark.webp", ...kifaruDestinations.map(({ image }) => image)];
  let total = 0;
  for (const asset of assets) {
    const file = new URL(`../public${asset}`, import.meta.url);
    const bytes = readFileSync(file);
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
    assert.ok(statSync(file).size < 100_000, `${asset} should stay below 100KB`);
    total += bytes.length;
  }
  assert.ok(total < 280_000, `combined assets should stay below 280KB, got ${total}`);
});

const { processPosition, processStageScroll } = await import('../src/components/site/process/process-timeline.ts');
const { transferFrame } = await import('../src/components/site/journey/transfer-geometry.ts');
test('travelling graphic holds through the Hero pause and matches both viewport anchors', () => {
  const source = { left: 420, top: 140, width: 740, height: 624.375 };
  const target = { left: 490, top: 260, width: 600, height: 506.25 };
  const start = 1050, end = 1950;
  for (const scroll of [0, 600, start]) {
    const pose = transferFrame(source, target, scroll, start, end);
    assert.equal(pose.progress, 0);
    assert.equal(pose.left, source.left);
    assert.equal(pose.top, source.top);
    assert.equal(pose.scale, 1);
  }
  const arrival = transferFrame(source, target, end, start, end);
  assert.equal(arrival.progress, 1);
  assert.equal(arrival.left, target.left);
  assert.equal(arrival.top, target.top);
  assert.equal(source.width * arrival.scale, target.width);
  assert.ok(Math.abs(source.height * arrival.scale - target.height) < 0.001);
  assert.equal(arrival.rotation, -4);
  assert.deepEqual(transferFrame(source, target, end + 2000, start, end), arrival);
});
test('travelling graphic stays in front of the viewport and reverses without accumulated offsets', () => {
  const source = { left: 450, top: 130, width: 600, height: 506.25 };
  const target = { left: 460, top: 240, width: 560, height: 472.5 };
  const forward = [1000, 1200, 1400, 1600, 1800].map(y => transferFrame(source, target, y, 1000, 1800));
  const backward = [1800, 1600, 1400, 1200, 1000].map(y => transferFrame(source, target, y, 1000, 1800));
  assert.deepEqual(backward.reverse(), forward);
  forward.forEach(pose => {
    assert.ok(pose.top >= source.top && pose.top <= target.top);
    assert.ok(pose.top + source.height * pose.scale < 800);
  });
});
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
test('Process releases into normal Portfolio flow after Deliver', () => {
 const viewport=900, height=4*viewport, start=900;
 const distance=processScrollDistance(height,viewport);
 const deliver=processStageScroll(3,start,distance);
 assert.equal(start+height-deliver,viewport);
 assert.equal(processScrollDistance(400,900),1);
});
const {validateContact}=await import('../src/lib/contact-validation.ts');
const valid={name:'Test User',company:'Studio',website:'https://example.com',email:'test@example.com',message:'A test website enquiry.',nickname:''};
test('contact validation accepts bounded input and trims whitespace',()=>{
 assert.equal(validateContact({...valid,name:'  Test User  '}).values.name,'Test User');
 assert.ok(validateContact({...valid,company:'',website:''}).values);
});
test('contact validation rejects malformed, unsafe and oversized values',()=>{
 for(const input of [null,[],{}, {...valid,name:'a'},{...valid,email:'bad'},{...valid,website:'javascript:alert(1)'},{...valid,website:'https://user:secret@example.com'},{...valid,message:'x'.repeat(3001)},{...valid,message:'tiny'},{...valid,name:45}]) assert.ok(validateContact(input).error);
});

// The final rest is separate from the four-stage animation range.
test('Process holds Deliver for half a viewport on phone, tablet and desktop', () => {
 for (const viewport of [667, 844, 900, 1180]) {
  const start = 1.28 * viewport, height = 4.5 * viewport;
  const distance = processScrollDistance(height, viewport, 0, 0.5 * viewport);
  const deliver = processStageScroll(3, start, distance);
  const release = start + height - viewport;
  assert.ok(Math.abs(release - deliver - viewport * 0.5) < 0.001);
  for (const y of [deliver, deliver + viewport * 0.25, release]) {
   assert.equal(processPosition((y - start) / distance).active, 3);
  }
 }
});
