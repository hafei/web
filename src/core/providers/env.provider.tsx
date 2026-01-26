"use client";

import { useEffect, useState, createContext, useContext, type ReactNode } from "react";

type EnvConfig = {
    WEB_HOSTNAME_API: string;
    WEB_PORT_API: string;
    NEXTAUTH_URL: string;
    WEB_NODE_ENV: string;
    WEB_GITHUB_INSTALL_URL: string;
    GLOBAL_GITLAB_CLIENT_ID: string;
    GLOBAL_GITLAB_REDIRECT_URL: string;
    WEB_GITLAB_SCOPES: string;
    WEB_GITLAB_OAUTH_URL: string;
    WEB_TERMS_AND_CONDITIONS: string;
    WEB_SUPPORT_DOCS_URL: string;
    WEB_SUPPORT_DISCORD_INVITE_URL: string;
    WEB_SUPPORT_TALK_TO_FOUNDER_URL: string;
    WEB_BITBUCKET_INSTALL_URL: string;
    WEB_HOSTNAME_BILLING: string;
    WEB_PORT_BILLING: string;
    WEB_TOKEN_DOCS_GITHUB: string;
    WEB_TOKEN_DOCS_GITLAB: string;
    WEB_TOKEN_DOCS_BITBUCKET: string;
    WEB_TOKEN_DOCS_AZUREREPOS: string;
    WEB_HOSTNAME_MCP_MANAGER: string;
    WEB_PORT_MCP_MANAGER: string;
    WEB_RULE_FILES_DOCS: string;
    WEB_ANALYTICS_SECRET: string;
    WEB_ANALYTICS_HOSTNAME: string;
    WEB_PORT_ANALYTICS: string;
};

const EnvContext = createContext<EnvConfig | null>(null);

export function useEnv(): EnvConfig {
    const ctx = useContext(EnvContext);
    if (!ctx) {
        // Fallback to window.__ENV__ if context not available
        if (typeof window !== "undefined" && window.__ENV__) {
            return window.__ENV__ as EnvConfig;
        }
        // Return defaults
        return {
            WEB_HOSTNAME_API: "localhost",
            WEB_PORT_API: "",
            NEXTAUTH_URL: "",
            WEB_NODE_ENV: "production",
            WEB_GITHUB_INSTALL_URL: "",
            GLOBAL_GITLAB_CLIENT_ID: "",
            GLOBAL_GITLAB_REDIRECT_URL: "",
            WEB_GITLAB_SCOPES: "",
            WEB_GITLAB_OAUTH_URL: "",
            WEB_TERMS_AND_CONDITIONS: "",
            WEB_SUPPORT_DOCS_URL: "",
            WEB_SUPPORT_DISCORD_INVITE_URL: "",
            WEB_SUPPORT_TALK_TO_FOUNDER_URL: "",
            WEB_BITBUCKET_INSTALL_URL: "",
            WEB_HOSTNAME_BILLING: "",
            WEB_PORT_BILLING: "",
            WEB_TOKEN_DOCS_GITHUB: "",
            WEB_TOKEN_DOCS_GITLAB: "",
            WEB_TOKEN_DOCS_BITBUCKET: "",
            WEB_TOKEN_DOCS_AZUREREPOS: "",
            WEB_HOSTNAME_MCP_MANAGER: "",
            WEB_PORT_MCP_MANAGER: "",
            WEB_RULE_FILES_DOCS: "",
            WEB_ANALYTICS_SECRET: "",
            WEB_ANALYTICS_HOSTNAME: "",
            WEB_PORT_ANALYTICS: "",
        };
    }
    return ctx;
}

type EnvProviderProps = {
    children: ReactNode;
    initialEnv?: EnvConfig;
};

export function EnvProvider({ children, initialEnv }: EnvProviderProps) {
    const [env, setEnv] = useState<EnvConfig | null>(initialEnv || null);

    useEffect(() => {
        // Fetch runtime env from API
        fetch("/api/env")
            .then((res) => res.json())
            .then((data: EnvConfig) => {
                setEnv(data);
                // Also set on window for backward compatibility
                if (typeof window !== "undefined") {
                    window.__ENV__ = data;
                }
            })
            .catch((err) => {
                console.error("Failed to fetch runtime env:", err);
            });
    }, []);

    // While loading, use initialEnv or render children anyway
    // The context value will be null initially but components should handle this
    return (
        <EnvContext.Provider value={env}>
            {children}
        </EnvContext.Provider>
    );
}
