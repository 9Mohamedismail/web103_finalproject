const LOCAL_CLIENT_URL = "http://localhost:5173";
const DEPLOYED_CLIENT_URL = "https://cardmaxer.onrender.com";

const normalizeUrl = (url) => url.trim().replace(/\/+$/, "");

export const isProduction =
    process.env.NODE_ENV === "production" || process.env.RENDER === "true";

export const clientUrl = normalizeUrl(
    process.env.CLIENT_URL ||
        (isProduction ? DEPLOYED_CLIENT_URL : LOCAL_CLIENT_URL),
);

const extraClientUrls = (process.env.CLIENT_URLS || "")
    .split(",")
    .map(normalizeUrl)
    .filter(Boolean);

export const allowedClientOrigins = new Set([
    clientUrl,
    ...(isProduction ? [DEPLOYED_CLIENT_URL] : [LOCAL_CLIENT_URL]),
    ...extraClientUrls,
]);
