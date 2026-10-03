/** Confirmed project destinations have defaults; unconfirmed contact links stay unset. */
function https(value: string | undefined) {
  if (!value) return undefined;
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password ? url.href : undefined; } catch { return undefined; }
}
export const publicLinks = {
  whatsapp: https(process.env.NEXT_PUBLIC_WHATSAPP_URL),
  projects: {
    "rom-africa": https(process.env.NEXT_PUBLIC_ROM_AFRICA_URL) ?? "https://rom-africa-website.vercel.app/",
    ridgeview: https(process.env.NEXT_PUBLIC_RIDGEVIEW_URL),
    "carlux-kenya": https(process.env.NEXT_PUBLIC_CARLUX_URL) ?? "https://carlux-kenya.vercel.app/",
  },
  instagram: https(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  linkedin: https(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  x: https(process.env.NEXT_PUBLIC_X_URL),
};
