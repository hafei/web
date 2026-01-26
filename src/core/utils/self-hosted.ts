import { RUNTIME_CONFIG } from "../config/runtime-config";

export const isSelfHosted = RUNTIME_CONFIG.WEB_NODE_ENV === "self-hosted";
