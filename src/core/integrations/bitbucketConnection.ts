import { IIntegrationConnector } from "./IIntegrationConnector";
import { RUNTIME_CONFIG } from "../config/runtime-config";

export class BitbucketConnection implements IIntegrationConnector {
    async connect(
        hasConnection: boolean,
        routerConfig: any,
        routerPath?: string,
    ) {
        if (hasConnection) {
            routerConfig.push(
                routerPath ||
                `${routerConfig.pathname}/bitbucket/configuration`,
            );
        } else {
            window.location.href = RUNTIME_CONFIG.WEB_BITBUCKET_INSTALL_URL || "";
        }
    }
}
