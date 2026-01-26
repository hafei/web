import { IIntegrationConnector } from "./IIntegrationConnector";

import { RUNTIME_CONFIG } from "../config/runtime-config";

export class GitHubConnection implements IIntegrationConnector {
    async connect(
        hasConnection: boolean,
        routerConfig: any,
        routerPath?: string,
    ) {
        if (hasConnection) {
            routerConfig.push(
                routerPath || `${routerConfig.pathname}/github/configuration`,
            );
        } else {
            window.location.href = RUNTIME_CONFIG.WEB_GITHUB_INSTALL_URL || "";
        }
    }
}
