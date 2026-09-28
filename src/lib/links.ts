/** Leave unset until the real destinations are ready. Never fabricate contact links. */
function https(value: string | undefined) {
  if (!value) return undefined;
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password ? url.href : undefined; } catch { return undefined; }
}
export const publicLinks = {
  whatsapp: https(process.env.NEXT_PUBLIC_WHATSAPP_URL),
  projects: {
    "rom-africa": https(process.env.NEXT_PUBLIC_ROM_AFRICA_URL),
    ridgeview: https(process.env.NEXT_PUBLIC_RIDGEVIEW_URL),
    autolux: https(process.env.NEXT_PUBLIC_AUTOLUX_URL),
  },
  instagram: https(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  linkedin: https(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  x: https(process.env.NEXT_PUBLIC_X_URL),
};
