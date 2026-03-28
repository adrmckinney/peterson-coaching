import fallback from "../../content/fallback.json";

export type FallbackContent = typeof fallback;

export const useFallbackContent = () => fallback;
