const BRAND: string = "leancloud";
const REGION: string = "cn";

// Cloud Engine
export const CLI_BINARY: string = BRAND === "tds" ? "tds" : "lean";
export const HAS_SUB_DOMAIN: boolean = BRAND === "tds" || REGION === "global";
