const BRAND: string = "tds";
const REGION: string = "global";

// Cloud Engine
export const CLI_BINARY: string = BRAND === "tds" ? "tds" : "lean";
export const HAS_SUB_DOMAIN: boolean = BRAND === "tds" || REGION === "global";
