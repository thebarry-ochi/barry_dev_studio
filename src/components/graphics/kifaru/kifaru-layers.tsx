import { kifaruDestinations, kifaruGeometry as g, kifaruHeroImage, kifaruSketchImage, type Box } from "./kifaru-system";

const ink = "var(--brand-navy)";
const wire = "var(--kifaru-wire-ink)";
const fill = "var(--kifaru-wire-fill)";
type LayerProps = { prefix: string };

function roughBox({ x, y, width: w, height: h }: Box) {
  return `M${x} ${y} Q${x + w * .44} ${y - 1.5} ${x + w} ${y + 1} L${x + w + 1} ${y + h} Q${x + w * .52} ${y + h + 1.5} ${x - 1} ${y + h - 1} Z`;
}

function ElephantMark() {
  return <path d="M0 12 Q-2 3 5 3 L14 4 Q19 0 23 5 L24 15 Q28 20 26 22 Q21 21 21 15 L19 13 L18 23 H15 L14 15 H7 L6 23 H3 L3 13Z M1 8 L-2 15" />;
}

function Navigation({ mode }: { mode: "sketch" | "wire" | "design" }) {
  const sketch = mode === "sketch";
  const color = mode === "wire" ? wire : ink;
  return <g data-part="navigation" fill={color} stroke="none" transform={`translate(${g.navigation.x} ${g.navigation.y})`}>
    {mode === "wire" ? <circle cx="7" cy="10" r="7" fill={fill} /> : <g transform="translate(0 0) scale(.65)" fill={sketch ? "none" : ink} stroke={sketch ? ink : "none"} strokeWidth="1"><ElephantMark /></g>}
    <text x="24" y="14" fontSize="11" fontWeight={sketch ? "400" : "650"}>KIFARU</text>
    <g fontSize="6.6"><text x="178" y="12">Home</text><text x="223" y="12">Safaris</text><text x="269" y="12">Destinations</text><text x="334" y="12">About</text></g>
    <rect x="406" y="-2" width="78" height="24" rx={sketch ? 0 : 3} fill={sketch ? "none" : mode === "wire" ? wire : "#064b7c"} stroke={sketch ? ink : "none"} />
    <text x="445" y="13" textAnchor="middle" fontSize="7" fill={sketch ? ink : "white"}>Plan Your Trip</text>
  </g>;
}

function ImagePlaceholder({ x, y, width, height }: Box) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width={width} height={height} rx="2" fill="var(--kifaru-wire-surface)" />
    <g transform={`translate(${width / 2} ${height / 2}) scale(${Math.min(width / 130, height / 85)})`} fill={fill}>
      <circle cx="20" cy="-18" r="8" /><path d="M-38 30 L-12 -10 L11 15 L22 0 L44 30Z" />
    </g>
  </g>;
}

export function SketchLayer({ prefix }: LayerProps) {
  return <g className="kifaru-pencil" stroke={ink} strokeLinecap="round" strokeLinejoin="round" fill="none">
    <g id={`${prefix}-sketch-page`} data-part="page">
      <path pathLength="1" data-draw="page-outline" d={roughBox(g.page)} fill="white" strokeWidth="1" />
      <path pathLength="1" data-draw="page-pencil" d="M53 113 L54 477 L583 476 M63 106 L593 109 M50 149 H598 M52 359 H596 M64 102 V484 M584 103 V480" strokeWidth=".55" opacity=".25" />
      <path pathLength="1" data-draw="sketch-browser" d="M58 111 V99 Q58 94 63 94 H585 Q590 94 590 99 V111 M111 101 H556" strokeWidth=".8" />
      {[69, 79, 89].map(x => <circle key={x} cx={x} cy="102" r="2" strokeWidth=".8" />)}
    </g>
    <g data-part="hero-image" className="kifaru-pencil-scene"><image href={kifaruSketchImage} x="59" y="151" width="530" height="204" preserveAspectRatio="xMidYMid slice" /><rect x="59" y="151" width="270" height="204" fill={`url(#${prefix}-sketch-wash)`} /></g>
    <Navigation mode="sketch" />
    <g data-part="hero-copy" transform={`translate(${g.heroCopy.x} ${g.heroCopy.y})`}>
      <g stroke="none" fill={ink} fontSize="25"><text y="39">Extraordinary</text><text y="69">Journeys in Africa</text></g>
      <path pathLength="1" data-draw="body-copy" d="M0 91 L204 90 M0 102 L183 101 M0 113 L149 113" strokeWidth=".75" />
    </g>
    <g data-part="cta" transform={`translate(${g.cta.x} ${g.cta.y})`}>
      <path pathLength="1" data-draw="cta-outline" d={roughBox({ ...g.cta, x: 0, y: 0 })} strokeWidth="1" />
      <text x="11" y="18" fontSize="9" fill={ink} stroke="none">Explore Safaris</text>
      <path pathLength="1" data-draw="cta-arrow" d="M104 14 H115 M111 10 L115 14 L111 18" strokeWidth=".8" />
    </g>
    <g data-part="cards">
      <text x={g.cardsHeading.x} y="377" fill={ink} stroke="none" fontSize="12">Featured Experiences</text>
      {kifaruDestinations.map(card => <g data-card={card.key} key={card.key} transform={`translate(${card.x} ${g.cardImageY})`}>
        <path pathLength="1" data-draw="card-outline" d={roughBox({ x: 0, y: 0, width: g.cardImageWidth, height: g.cardImageHeight })} strokeWidth=".75" />
        <path pathLength="1" data-draw="card-cross" d="M1 1 L147 54 M147 1 L1 54" strokeWidth=".55" />
        <path pathLength="1" data-draw="card-copy" d="M1 64 H109 M1 70 H88 M1 76 H69" strokeWidth=".6" />
      </g>)}
    </g>
  </g>;
}

export function AnnotationLayer({ prefix }: LayerProps) {
  return <g className="kifaru-pencil" fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round">
    <g id={`${prefix}-annotation-notes`} data-part="notes" fontSize="11" fill={ink} stroke="none">
      <text x="379" y="63">Clean navigation</text>
      <text x="2" y="185"><tspan x="2">Clear</tspan><tspan x="2" dy="13">headline</tspan><tspan x="2" dy="13">that inspires</tspan></text>
      <text x="494" y="49"><tspan x="494">Impactful</tspan><tspan x="494" dy="13">hero image</tspan></text>
      <text x="5" y="293"><tspan x="5">Strong,</tspan><tspan x="5" dy="13">simple CTA</tspan></text>
      <text x="74" y="508">Featured destinations</text><text x="423" y="508">Showcase popular places</text>
    </g>
    <g id={`${prefix}-annotation-arrows`} data-part="arrows" strokeWidth=".8">
      <path pathLength="1" data-draw="nav-arrow" d="M375 67 Q351 70 344 96 M343 87 L344 96 L351 91" />
      <path pathLength="1" data-draw="story-arrow" d="M32 223 Q44 238 80 233 M73 230 L80 233 L73 237" />
      <path pathLength="1" data-draw="image-arrow" d="M564 68 Q619 105 556 198 M557 188 L556 198 L565 192" />
      <path pathLength="1" data-draw="cta-arrow" d="M35 315 Q53 337 79 327 M72 325 L79 327 L75 333" />
      <path pathLength="1" data-draw="cards-arrow" d="M167 496 Q187 480 179 463 M175 469 L179 463 L184 469 M499 496 Q470 487 470 459 M466 466 L470 459 L475 466" />
    </g>
  </g>;
}

export function WireframeLayer({ prefix }: LayerProps) {
  return <g fill={wire}>
    <rect id={`${prefix}-wireframe-page`} data-part="page" {...g.page} rx="4" fill="white" stroke="var(--kifaru-wire-border)" strokeWidth=".8" />
    <Navigation mode="wire" />
    <path d="M70 147 H578 M70 359 H578" stroke="var(--kifaru-wire-border)" strokeWidth=".5" />
    <g data-part="hero-copy" transform={`translate(${g.heroCopy.x} ${g.heroCopy.y})`}>
      <rect y="20" width="166" height="17" /><rect y="47" width="207" height="17" />
      <g fill={fill}><rect y="83" width="185" height="5" /><rect y="94" width="190" height="5" /><rect y="105" width="147" height="5" /></g>
    </g>
    <g data-part="cta" transform={`translate(${g.cta.x} ${g.cta.y})`}><rect width="125" height="28" rx="2" /><path d="M101 14 H115 M111 10 L115 14 L111 18" fill="none" stroke="white" strokeWidth=".9" /></g>
    <g data-part="hero-image"><ImagePlaceholder {...g.heroImage} /></g>
    <g data-part="cards"><text x="82" y="377" fontSize="10" fontWeight="650" fill={ink}>Featured Experiences</text>
      {kifaruDestinations.map(card => <g data-card={card.key} key={card.key}>
        <rect x={card.x} y={g.cardImageY} width="148" height="78" rx="3" fill="white" stroke="var(--kifaru-wire-border)" strokeWidth=".5" />
        <ImagePlaceholder x={card.x} y={g.cardImageY} width={g.cardImageWidth} height={g.cardImageHeight} />
        <g fill={fill}><rect x={card.x + 9} y="447" width="105" height="4" /><rect x={card.x + 9} y="454" width="81" height="3" /><rect x={card.x + 9} y="460" width="66" height="2" /></g>
      </g>)}
    </g>
  </g>;
}

export function HighFidelityLayer({ prefix }: LayerProps) {
  return <g fill={ink}>
    <rect id={`${prefix}-high-fidelity-page`} data-part="page" {...g.page} rx="3" fill="white" stroke="var(--brand-gray)" strokeWidth=".8" />
    <g data-part="hero-image">
      <image href={kifaruHeroImage} x="59" y="151" width="530" height="204" preserveAspectRatio="xMidYMax slice" />
      <rect x="59" y="151" width="310" height="204" fill={`url(#${prefix}-hero-wash)`} />
    </g>
    <Navigation mode="design" />
    <g data-part="hero-copy" transform={`translate(${g.heroCopy.x} ${g.heroCopy.y})`}>
      <text y="5" fontSize="6.8" letterSpacing=".8" fill="#38658e">AUTHENTIC AFRICAN SAFARIS</text>
      <g fontSize="24" fontWeight="700" letterSpacing="-.9"><text y="36">Extraordinary</text><text y="63">Journeys in Africa</text></g>
      <g fontSize="8.3"><text y="86">Tailor-made safaris, unforgettable experiences</text><text y="99">and a deeper connection to Africa’s wild places.</text></g>
    </g>
    <g data-part="cta" transform={`translate(${g.cta.x} ${g.cta.y})`}>
      <rect width="125" height="28" rx="3" fill="#064b7c" /><text x="11" y="18" fontSize="8" fontWeight="500" fill="white">Explore Safaris</text>
      <path d="M104 14 H115 M111 10 L115 14 L111 18" fill="none" stroke="white" strokeWidth=".9" />
    </g>
    <g data-part="cards"><text x="82" y="377" fontSize="10" fontWeight="650">Featured Experiences</text>
      {kifaruDestinations.map(card => <g data-card={card.key} key={card.key} transform={`translate(${card.x} ${g.cardImageY})`}>
        <rect width="148" height="78" rx="3" fill="white" stroke="var(--brand-gray)" strokeWidth=".5" />
        <image href={card.image} width="148" height="55" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${prefix}-clip-card)`} />
        <text x="7" y="66" fontSize="8" fontWeight="650">{card.name}</text><text x="7" y="74" fontSize="5.8">{card.description}</text>
      </g>)}
    </g>
  </g>;
}

/** The completed browser and immersive cards build on the same mounted design. */
export function FinishedLayer({ prefix }: LayerProps) {
  return <g fill={ink}>
    <g id={`${prefix}-finished-browser`} data-part="browser-chrome">
      <path d="M63 77 H585 Q590 77 590 82 V111 H58 V82 Q58 77 63 77Z" fill="#17212c" />
      <circle cx="71" cy="94" r="3" fill="#ff6057" /><circle cx="82" cy="94" r="3" fill="#febc2e" /><circle cx="93" cy="94" r="3" fill="#28c840" />
      <rect x="211" y="85" width="226" height="18" rx="4" fill="#333d48" />
      <text x="324" y="97" fontSize="7" textAnchor="middle" fill="white">kifarusafaris.com</text>
      <rect {...g.browser} rx="5" fill="none" stroke="#17212c" strokeWidth="1.3" />
    </g>
    <g data-part="finished-cards">{kifaruDestinations.map(card => <g key={card.key} transform={`translate(${card.x} ${g.cardImageY})`}>
      <image href={card.image} width="148" height="78" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${prefix}-clip-finished-card)`} />
      <rect width="148" height="78" rx="3" fill={`url(#${prefix}-card-shade)`} />
      <text x="7" y="60" fill="white" fontSize="8.5" fontWeight="650">{card.name}</text><text x="7" y="70" fontSize="5.5" fill="white">{card.description}</text>
      <circle cx="135" cy="60" r="8" fill="white" /><path d="M131 60 H139 M136 57 L139 60 L136 63" fill="none" stroke={ink} strokeWidth=".7" />
    </g>)}</g>
  </g>;
}
