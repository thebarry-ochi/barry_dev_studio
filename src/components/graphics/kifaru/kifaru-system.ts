/** Shared artboard coordinates. All visual states use these slots unchanged. */
export type Box = Readonly<{ x: number; y: number; width: number; height: number }>;

export const kifaruGeometry = {
  viewBox: "0 0 640 540",
  artboard: { x: 0, y: 0, width: 640, height: 540 },
  page: { x: 58, y: 111, width: 532, height: 360 },
  browser: { x: 58, y: 77, width: 532, height: 394 },
  browserBar: { x: 58, y: 77, width: 532, height: 34 },
  navigation: { x: 82, y: 121, width: 484, height: 18 },
  heroCopy: { x: 82, y: 171, width: 229, height: 126 },
  heroImage: { x: 335, y: 151, width: 231, height: 204 },
  cta: { x: 82, y: 311, width: 125, height: 28 },
  cardsHeading: { x: 82, y: 365, width: 220, height: 12 },
  cardImageY: 386,
  cardImageWidth: 148,
  cardImageHeight: 55,
  cardLabelY: 457,
} as const;

export const kifaruDestinations = [
  { key: "maasai-mara", name: "Maasai Mara", x: 82, image: "/assets/kifaru/maasai-mara.webp" },
  { key: "amboseli", name: "Amboseli", x: 250, image: "/assets/kifaru/amboseli.webp" },
  { key: "serengeti", name: "Serengeti", x: 418, image: "/assets/kifaru/serengeti.webp" },
] as const;

export const kifaruHeroImage = "/assets/kifaru/hero-safari.webp";

export const kifaruLayerNames = ["sketch", "annotations", "wireframe", "high-fidelity", "finished"] as const;
export type KifaruLayerName = (typeof kifaruLayerNames)[number];
export type KifaruStage = "sketch" | "wireframe" | "high-fidelity" | "finished";

type StageDefinition = {
  label: string;
  description: string;
  rotation: number;
  layers: Readonly<Record<KifaruLayerName, number>>;
};

export const kifaruStages = {
  sketch: {
    label: "Concept sketch",
    description: "A loose idea, with the right questions in the margins.",
    rotation: -3,
    layers: { sketch: 1, annotations: 1, wireframe: 0, "high-fidelity": 0, finished: 0 },
  },
  wireframe: {
    label: "Structured wireframe",
    description: "A clear structure for the story and the next step.",
    rotation: -1.5,
    layers: { sketch: 0, annotations: 0, wireframe: 1, "high-fidelity": 0, finished: 0 },
  },
  "high-fidelity": {
    label: "High-fidelity design",
    description: "Typography, colour and imagery bring the journey to life.",
    rotation: 1,
    layers: { sketch: 0, annotations: 0, wireframe: 0, "high-fidelity": 1, finished: 0 },
  },
  finished: {
    label: "Finished website",
    description: "The complete experience, ready for its first visitor.",
    rotation: 2,
    layers: { sketch: 0, annotations: 0, wireframe: 0, "high-fidelity": 1, finished: 1 },
  },
} as const satisfies Record<KifaruStage, StageDefinition>;
