import Image from "next/image";
import { UserIcon } from "@phosphor-icons/react";

export type PortraitSource = {
  src: string;
  alt: string;
};

/** Supply Barry's own image and descriptive alt text when the portrait is ready. */
export function AboutPortrait({ portrait }: { portrait?: PortraitSource }) {
  return portrait ? (
    <Image className="about-portrait-image" src={portrait.src} alt={portrait.alt} fill
      sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 40vw, 28vw" />
  ) : (
    <div className="about-portrait-placeholder" role="img" aria-label="Temporary portrait placeholder. Barry’s photograph will be added here.">
      <UserIcon size={72} weight="thin" aria-hidden="true" />
      <span aria-hidden="true">Portrait to follow</span>
    </div>
  );
}
