import { isServerSide } from "src/core/utils/server-side";

declare global {
    interface Window {
        __ENV__: {
            WEB_HOSTNAME_API?: string;
            WEB_PORT_API?: string;
            NEXTAUTH_URL?: string;
            WEB_NODE_ENV?: string;
            WEB_GITHUB_INSTALL_URL?: string;
            GLOBAL_GITLAB_CLIENT_ID?: string;
            GLOBAL_GITLAB_REDIRECT_URL?: string;
            WEB_GITLAB_SCOPES?: string;
            WEB_GITLAB_OAUTH_URL?: string;
            WEB_TERMS_AND_CONDITIONS?: string;
            WEB_SUPPORT_DOCS_URL?: string;
            WEB_SUPPORT_DISCORD_INVITE_URL?: string;
            WEB_SUPPORT_TALK_TO_FOUNDER_URL?: string;
            WEB_BITBUCKET_INSTALL_URL?: string;
            WEB_HOSTNAME_BILLING?: string;
            WEB_PORT_BILLING?: string;
            WEB_TOKEN_DOCS_GITHUB?: string;
            WEB_TOKEN_DOCS_GITLAB?: string;
            WEB_TOKEN_DOCS_BITBUCKET?: string;
            WEB_TOKEN_DOCS_AZUREREPOS?: string;
            WEB_HOSTNAME_MCP_MANAGER?: string;
            WEB_PORT_MCP_MANAGER?: string;
            WEB_RULE_FILES_DOCS?: string;
            WEB_ANALYTICS_SECRET?: string;
            WEB_ANALYTICS_HOSTNAME?: string;
            WEB_PORT_ANALYTICS?: string;
        };
    }
}

const getEnv = (key: keyof Window["__ENV__"]): string => {
    if (isServerSide) {
        return process.env[key] || "";
    }
    return window.__ENV__?.[key] || process.env[key] || "";
};

export const RUNTIME_CONFIG = {
    get WEB_HOSTNAME_API() { return getEnv("WEB_HOSTNAME_API") },
    get WEB_PORT_API() { return getEnv("WEB_PORT_API") },
    get NEXTAUTH_URL() { return getEnv("NEXTAUTH_URL") },
    get WEB_NODE_ENV() { return getEnv("WEB_NODE_ENV") },
    get WEB_GITHUB_INSTALL_URL() { return getEnv("WEB_GITHUB_INSTALL_URL") },
    get GLOBAL_GITLAB_CLIENT_ID() { return getEnv("GLOBAL_GITLAB_CLIENT_ID") },
    get GLOBAL_GITLAB_REDIRECT_URL() { return getEnv("GLOBAL_GITLAB_REDIRECT_URL") },
    get WEB_GITLAB_SCOPES() { return getEnv("WEB_GITLAB_SCOPES") },
    get WEB_GITLAB_OAUTH_URL() { return getEnv("WEB_GITLAB_OAUTH_URL") },
    get WEB_TERMS_AND_CONDITIONS() { return getEnv("WEB_TERMS_AND_CONDITIONS") },
    get WEB_SUPPORT_DOCS_URL() { return getEnv("WEB_SUPPORT_DOCS_URL") },
    get WEB_SUPPORT_DISCORD_INVITE_URL() { return getEnv("WEB_SUPPORT_DISCORD_INVITE_URL") },
    get WEB_SUPPORT_TALK_TO_FOUNDER_URL() { return getEnv("WEB_SUPPORT_TALK_TO_FOUNDER_URL") },
    get WEB_BITBUCKET_INSTALL_URL() { return getEnv("WEB_BITBUCKET_INSTALL_URL") },
    get WEB_HOSTNAME_BILLING() { return getEnv("WEB_HOSTNAME_BILLING") },
    get WEB_PORT_BILLING() { return getEnv("WEB_PORT_BILLING") },
    get WEB_TOKEN_DOCS_GITHUB() { return getEnv("WEB_TOKEN_DOCS_GITHUB") },
    get WEB_TOKEN_DOCS_GITLAB() { return getEnv("WEB_TOKEN_DOCS_GITLAB") },
    get WEB_TOKEN_DOCS_BITBUCKET() { return getEnv("WEB_TOKEN_DOCS_BITBUCKET") },
    get WEB_TOKEN_DOCS_AZUREREPOS() { return getEnv("WEB_TOKEN_DOCS_AZUREREPOS") },
    get WEB_HOSTNAME_MCP_MANAGER() { return getEnv("WEB_HOSTNAME_MCP_MANAGER") },
    get WEB_PORT_MCP_MANAGER() { return getEnv("WEB_PORT_MCP_MANAGER") },
    get WEB_RULE_FILES_DOCS() { return getEnv("WEB_RULE_FILES_DOCS") },
    get WEB_ANALYTICS_SECRET() { return getEnv("WEB_ANALYTICS_SECRET") },
    get WEB_ANALYTICS_HOSTNAME() { return getEnv("WEB_ANALYTICS_HOSTNAME") },
    get WEB_PORT_ANALYTICS() { return getEnv("WEB_PORT_ANALYTICS") },
} as const;
