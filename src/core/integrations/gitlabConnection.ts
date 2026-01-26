import { IIntegrationConnector } from "./IIntegrationConnector";
import { RUNTIME_CONFIG } from "../config/runtime-config";

export class GitlabConnection implements IIntegrationConnector {
    async connect(
        hasConnection: boolean,
        routerConfig: any,
        routerPath?: string,
    ) {
        if (hasConnection) {
            routerConfig.push(
                routerPath || `${routerConfig.pathname}/gitlab/configuration`,
            );
        } else {
            const oauthURL = RUNTIME_CONFIG.WEB_GITLAB_OAUTH_URL || "";
            const scopes = RUNTIME_CONFIG.WEB_GITLAB_SCOPES || "";
            const clientId = RUNTIME_CONFIG.GLOBAL_GITLAB_CLIENT_ID;
            const redirectURI = RUNTIME_CONFIG.GLOBAL_GITLAB_REDIRECT_URL;

            window.location.href = `${oauthURL}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code&scope=${encodeURIComponent(scopes)}&state=${Math.random().toString(36).substring(7)}`;
        }
    }
}
