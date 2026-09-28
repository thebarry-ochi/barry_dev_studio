export type ContactValues = { name: string; company: string; website: string; email: string; message: string; nickname: string };
export function validateContact(input: unknown): { values?: ContactValues; error?: string } {
 if (!input || typeof input !== "object" || Array.isArray(input)) return { error: "Please check your form details." };
 const source = input as Record<string, unknown>;
 const values = {} as ContactValues;
 const limits = { name:120, company:160, website:500, email:254, message:3000, nickname:120 };
 for (const key of Object.keys(limits) as (keyof ContactValues)[]) {
  if (typeof source[key] !== "string" || source[key].length > limits[key]) return {error:"Please check the length of your form details."};
  values[key] = source[key].trim();
 }
 if (values.name.length < 2) return {error:"Please enter your name."};
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return {error:"Please enter a valid email address."};
 if (values.website) { try { const url = new URL(values.website); if (!["https:","http:"].includes(url.protocol) || url.username || url.password) throw new Error(); } catch { return {error:"Please enter a website URL beginning with https:// or http://."}; } }
 if (values.message.length < 10) return {error:"Please tell me a little more about your website (at least 10 characters)."};
 return {values};
}
