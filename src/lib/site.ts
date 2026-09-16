const configuredUrl = process.env.SITE_URL;
const url = configuredUrl ? new URL(configuredUrl) : undefined;
if (url && (!["https:", "http:"].includes(url.protocol) || url.pathname !== "/" || url.search || url.hash || url.username || url.password)) {
  throw new Error("SITE_URL must be an HTTP(S) origin without a path, credentials, query, or fragment.");
}

export const site = {
  name: "Barry Dev Studio",
  description: "The home of Barry Dev Studio.",
  url,
  indexable: Boolean(url) && process.env.SITE_INDEXABLE === "true",
};
