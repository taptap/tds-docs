export const BRAND: string = "leancloud";
export const REGION: string = "cn";

// Cloud Engine
export const CLI_BINARY: string = BRAND === "tds" ? "tds" : "lean";
export const HAS_SUB_DOMAIN: boolean = REGION === "global";
export const HAS_ENGINE_CDN_DOMAIN: boolean = REGION === 'cn'
