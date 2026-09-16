import { kifaruDestinations, kifaruGeometry as g, kifaruHeroImage, type Box } from "./kifaru-system";

const ink = "var(--brand-navy)";
const wire = "var(--kifaru-wire-ink)";
const fill = "var(--kifaru-wire-fill)";

type LayerProps = { prefix: string };

function roughBox({ x, y, width: w, height: h }: Box) {
  return `M${x} ${y} Q${x + w * 0.44} ${y - 1.5} ${x + w} ${y + 1} L${x + w + 1} ${y + h} Q${x + w * 0.52} ${y + h + 1.5} ${x - 1} ${y + h - 1} Z`;
}

/** Each path is deterministic and independently targetable for line drawing. */
export function SketchLayer({ prefix }: LayerProps) {
  return (
    <g stroke={ink} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <g id={`${prefix}-sketch-page`} data-part="page">
        <path pathLength="1" data-draw="page-outline" d={roughBox(g.page)} fill="var(--brand-white)" strokeWidth="1.4" />
        <path pathLength="1" data-draw="page-pencil" d="M54 120 L55 475 L579 475 M63 107 L581 109" strokeWidth="0.65" opacity="0.25" />
      </g>
      <g id={`${prefix}-sketch-nav`} data-part="navigation" transform={`translate(${g.navigation.x} ${g.navigation.y})`}>
        <text x="0" y="14" stroke="none" fill={ink} fontSize="13" fontWeight="650" letterSpacing="2">KIFARU</text>
        <path pathLength="1" data-draw="nav-links" d="M290 9 L318 8 M348 8 L397 9 M428 8 L473 9 M1 19 L59 20" strokeWidth="1" />
      </g>
      <g id={`${prefix}-sketch-hero-copy`} data-part="hero-copy" transform={`translate(${g.heroCopy.x} ${g.heroCopy.y})`}>
        <path pathLength="1" data-draw="eyebrow" d="M0 8 L97 7 M2 11 L82 10" strokeWidth="0.9" opacity="0.5" />
        <g stroke="none" fill={ink} fontWeight="500" fontSize="30" letterSpacing="-1.1"><text x="0" y="49">Journeys into</text><text x="0" y="83">the wild.</text></g>
        <path pathLength="1" data-draw="headline-underline" d="M1 89 Q73 94 127 88 M5 93 L116 92" strokeWidth="0.8" opacity="0.5" />
        <path pathLength="1" data-draw="body-copy" d="M0 107 L142 108 M1 120 L117 119" strokeWidth="1" opacity="0.5" />
      </g>
      <g id={`${prefix}-sketch-cta`} data-part="cta" transform={`translate(${g.cta.x} ${g.cta.y})`}>
        <path pathLength="1" data-draw="cta-outline" d={roughBox({ ...g.cta, x: 0, y: 0 })} strokeWidth="1" />
        <text x="12" y="18" fontSize="7" fill={ink} stroke="none" fontWeight="500">EXPLORE SAFARIS</text>
        <path pathLength="1" data-draw="cta-arrow" d="M103 14 H115 M111 10 L115 14 L111 18" strokeWidth="0.9" />
      </g>
      <g id={`${prefix}-sketch-hero-image`} data-part="hero-image" transform={`translate(${g.heroImage.x} ${g.heroImage.y})`}>
        <path pathLength="1" data-draw="hero-image-outline" d={roughBox({ ...g.heroImage, x: 0, y: 0 })} strokeWidth="1" />
        <path pathLength="1" data-draw="hero-image-cross" d="M5 7 L226 197 M225 6 L6 198" strokeWidth="0.6" opacity="0.13" />
        <path pathLength="1" data-draw="landscape" d="M1 153 Q39 136 73 150 Q115 137 154 153 Q195 141 230 151 M12 136 Q29 116 53 131 Q66 109 95 129 Q119 115 145 135 Q174 120 212 137" strokeWidth="0.9" opacity="0.45" />
        <path pathLength="1" data-draw="acacia" d="M175 148 L174 101 M174 115 L155 101 M175 115 L195 103 M139 100 Q143 89 158 92 Q166 80 177 87 Q187 81 201 94 Q214 92 218 101 Q180 109 139 100Z" strokeWidth="1.1" />
        <path pathLength="1" data-draw="elephant" d="M46 156 L45 128 Q45 116 58 115 L85 119 Q98 120 100 131 L98 158 L91 158 L90 139 L73 139 L71 157 L65 157 L64 138 L52 136 L53 156 Z M45 128 Q35 130 37 145 L40 149 M51 120 Q42 113 39 124 M43 131 L35 136" strokeWidth="1.3" />
        <path pathLength="1" data-draw="grass" d="M48 166 L93 167 M103 175 L149 175 M20 181 L55 179 M180 161 L217 160" strokeWidth="0.6" opacity="0.3" />
      </g>
      <g id={`${prefix}-sketch-cards`} data-part="cards">
        <text x={g.cardsHeading.x} y={g.cardsHeading.y + 10} stroke="none" fill={ink} fontSize="7.5" fontWeight="600" letterSpacing="1">FEATURED JOURNEYS</text>
        {kifaruDestinations.map((card) => (
          <g key={card.key} id={`${prefix}-sketch-card-${card.key}`} data-card={card.key} transform={`translate(${card.x} ${g.cardImageY})`}>
            <path pathLength="1" data-draw="card-outline" d={roughBox({ x: 0, y: 0, width: g.cardImageWidth, height: g.cardImageHeight })} strokeWidth="0.85" />
            <path pathLength="1" data-draw="card-cross" d="M4 5 L144 51 M144 5 L4 51" strokeWidth="0.6" opacity="0.17" />
            <path pathLength="1" data-draw="card-landscape" d="M8 49 L52 18 L83 40 L107 29 L142 49" strokeWidth="0.8" opacity="0.55" />
            <text x="0" y={g.cardLabelY - g.cardImageY} fill={ink} stroke="none" fontSize="8">{card.name}</text>
            <path pathLength="1" data-draw="card-arrow" d="M132 67 H144 M140 63 L144 67 L140 71" strokeWidth="0.75" />
          </g>
        ))}
      </g>
    </g>
  );
}

export function AnnotationLayer({ prefix }: LayerProps) {
  return (
    <g stroke="var(--brand-blue)" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <g id={`${prefix}-annotation-notes`} data-part="notes" fontStyle="italic" fontSize="12" fill="var(--brand-blue)" stroke="none">
        <text x="76" y="46">Start with a story.</text><text x="412" y="57">Make it feel real.</text><text x="77" y="514">A clear next step.</text>
      </g>
      <g id={`${prefix}-annotation-arrows`} data-part="arrows" strokeWidth="1.1">
        <path pathLength="1" data-draw="story-arrow" d="M168 54 Q213 74 192 183 M187 174 L192 183 L198 174" />
        <path pathLength="1" data-draw="image-arrow" d="M508 65 Q563 82 549 149 M544 141 L549 149 L555 142" />
        <path pathLength="1" data-draw="cta-arrow" d="M164 497 Q218 482 217 355 Q219 342 205 331 M208 341 L205 331 L215 334" />
      </g>
      <g id={`${prefix}-annotation-measurements`} data-part="measurements" strokeWidth="0.7" opacity="0.45">
        <path pathLength="1" data-draw="vertical-measure" d="M40 171 Q33 275 40 355 M34 177 L40 170 L46 177 M34 348 L40 356 L47 349" />
        <path pathLength="1" data-draw="width-measure" d="M338 138 L564 138 M339 134 L339 142 M564 134 L564 142" />
      </g>
    </g>
  );
}

export function WireframeLayer({ prefix }: LayerProps) {
  return (
    <g fill={wire}>
      <rect id={`${prefix}-wireframe-page`} data-part="page" {...g.page} fill="var(--brand-white)" stroke="var(--kifaru-wire-border)" strokeWidth="1" />
      <g id={`${prefix}-wireframe-nav`} data-part="navigation" transform={`translate(${g.navigation.x} ${g.navigation.y})`}>
        <rect y="1" width="64" height="14" rx="1" fill={fill} /><text x="7" y="11" fontSize="7" letterSpacing="1">LOGO</text>
        <rect x="290" y="6" width="28" height="5" rx="1" fill={fill} /><rect x="348" y="6" width="49" height="5" rx="1" fill={fill} /><rect x="428" y="6" width="45" height="5" rx="1" fill={fill} />
      </g>
      <g id={`${prefix}-wireframe-hero-copy`} data-part="hero-copy" transform={`translate(${g.heroCopy.x} ${g.heroCopy.y})`}>
        <rect y="4" width="99" height="5" rx="1" fill={fill} />
        <rect y="26" width="211" height="23" rx="1" /><rect y="60" width="127" height="23" rx="1" />
        <rect y="103" width="146" height="5" rx="1" fill={fill} /><rect y="116" width="116" height="5" rx="1" fill={fill} />
      </g>
      <g id={`${prefix}-wireframe-cta`} data-part="cta" transform={`translate(${g.cta.x} ${g.cta.y})`}>
        <rect width={g.cta.width} height={g.cta.height} rx="2" fill={fill} /><text x="12" y="18" fontSize="7" fontWeight="500">PRIMARY ACTION</text>
      </g>
      <g id={`${prefix}-wireframe-hero-image`} data-part="hero-image" transform={`translate(${g.heroImage.x} ${g.heroImage.y})`}>
        <rect width={g.heroImage.width} height={g.heroImage.height} fill="var(--kifaru-wire-surface)" stroke="var(--kifaru-wire-border)" />
        <path d="M0 0 L231 204 M231 0 L0 204" fill="none" stroke="var(--kifaru-wire-border)" strokeWidth="0.8" />
        <rect x="84" y="94" width="64" height="16" fill="var(--kifaru-wire-surface)" /><text x="116" y="105" fontSize="8" textAnchor="middle" letterSpacing="1">HERO IMAGE</text>
      </g>
      <g id={`${prefix}-wireframe-cards`} data-part="cards">
        <rect x={g.cardsHeading.x} y={g.cardsHeading.y + 3} width="112" height="6" rx="1" />
        {kifaruDestinations.map((card) => (
          <g id={`${prefix}-wireframe-card-${card.key}`} data-card={card.key} key={card.key} transform={`translate(${card.x} ${g.cardImageY})`}>
            <rect width={g.cardImageWidth} height={g.cardImageHeight} fill="var(--kifaru-wire-surface)" stroke="var(--kifaru-wire-border)" />
            <path d={`M0 0 L${g.cardImageWidth} ${g.cardImageHeight} M${g.cardImageWidth} 0 L0 ${g.cardImageHeight}`} fill="none" stroke="var(--kifaru-wire-border)" strokeWidth="0.7" />
            <rect y="66" width="69" height="5" rx="1" fill={fill} /><rect x="133" y="66" width="15" height="5" rx="1" fill={fill} />
          </g>
        ))}
      </g>
    </g>
  );
}

export function HighFidelityLayer({ prefix }: LayerProps) {
  return (
    <g fill={ink}>
      <rect id={`${prefix}-high-fidelity-page`} data-part="page" {...g.page} fill="var(--brand-white)" stroke="var(--brand-gray)" strokeWidth="0.8" />
      <g id={`${prefix}-high-fidelity-nav`} data-part="navigation" transform={`translate(${g.navigation.x} ${g.navigation.y})`}>
        <text y="14" fontSize="13" fontWeight="700" letterSpacing="2">KIFARU</text>
        <g fontSize="6.5" fontWeight="500" letterSpacing="0.35"><text x="290" y="13">SAFARIS</text><text x="348" y="13">DESTINATIONS</text><text x="428" y="13">OUR STORY</text></g>
      </g>
      <g id={`${prefix}-high-fidelity-hero-copy`} data-part="hero-copy" transform={`translate(${g.heroCopy.x} ${g.heroCopy.y})`}>
        <text y="11" fontSize="6.5" letterSpacing="1.6" fill="var(--brand-blue)" fontWeight="500">EXTRAORDINARY AFRICA</text>
        <g fontSize="31" fontWeight="600" letterSpacing="-1.2"><text y="49">Journeys into</text><text y="83">the wild.</text></g>
        <g fontSize="8" fill="var(--brand-black)"><text y="108">Thoughtful African journeys,</text><text y="121">designed around you.</text></g>
      </g>
      <g id={`${prefix}-high-fidelity-cta`} data-part="cta" transform={`translate(${g.cta.x} ${g.cta.y})`}>
        <rect width={g.cta.width} height={g.cta.height} rx="2" fill="var(--brand-blue)" />
        <text x="12" y="18" fontSize="7" fontWeight="600" fill="var(--brand-white)">EXPLORE SAFARIS</text>
        <path d="M103 14 H115 M111 10 L115 14 L111 18" fill="none" stroke="var(--brand-white)" strokeWidth="0.9" />
      </g>
      <g id={`${prefix}-high-fidelity-hero-image`} data-part="hero-image" transform={`translate(${g.heroImage.x} ${g.heroImage.y})`}>
        <image href={kifaruHeroImage} width={g.heroImage.width} height={g.heroImage.height} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${prefix}-clip-hero)`} />
      </g>
      <g id={`${prefix}-high-fidelity-cards`} data-part="cards">
        <text x={g.cardsHeading.x} y={g.cardsHeading.y + 10} fontSize="7.5" fontWeight="600" letterSpacing="1">FEATURED JOURNEYS</text>
        {kifaruDestinations.map((card) => (
          <g id={`${prefix}-high-fidelity-card-${card.key}`} data-card={card.key} key={card.key} transform={`translate(${card.x} ${g.cardImageY})`}>
            <image href={card.image} width={g.cardImageWidth} height={g.cardImageHeight} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${prefix}-clip-card)`} />
            <text y={g.cardLabelY - g.cardImageY} fontSize="8" fontWeight="500">{card.name}</text>
            <path d="M132 67 H144 M140 63 L144 67 L140 71" fill="none" stroke={ink} strokeWidth="0.75" />
          </g>
        ))}
      </g>
    </g>
  );
}

/** Finishing is additive: the high-fidelity UI remains the very same mounted group. */
export function FinishedLayer({ prefix }: LayerProps) {
  return (
    <g fill={ink}>
      <g id={`${prefix}-finished-browser`} data-part="browser-chrome">
        <path d="M63 77 H585 Q590 77 590 82 V111 H58 V82 Q58 77 63 77Z" fill="var(--kifaru-browser-surface)" stroke="var(--brand-gray)" strokeWidth="0.8" />
        <g fill="var(--kifaru-chrome-ink)"><circle cx="74" cy="94" r="2.8" /><circle cx="84" cy="94" r="2.8" /><circle cx="94" cy="94" r="2.8" /></g>
        <rect x="211" y="85" width="226" height="18" rx="3" fill="var(--brand-white)" stroke="var(--brand-gray)" strokeWidth="0.5" />
        <text x="324" y="97" fontSize="7" textAnchor="middle" fill="var(--kifaru-chrome-ink)">kifaru.example</text>
        <rect {...g.browser} rx="5" fill="none" stroke="var(--kifaru-frame-border)" strokeWidth="0.8" />
      </g>
    </g>
  );
}
