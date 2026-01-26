import { NextResponse } from "next/server";

/**
 * API Route: /api/env
 *
 * 提供运行时环境变量给客户端。
 * 这避免了 Next.js 在构建时硬编码环境变量的问题。
 */
export async function GET() {
    const env = {
        WEB_HOSTNAME_API: process.env.WEB_HOSTNAME_API || "localhost",
        WEB_PORT_API: process.env.WEB_PORT_API || "",
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || "",
        WEB_NODE_ENV: process.env.WEB_NODE_ENV || "production",
        WEB_GITHUB_INSTALL_URL: process.env.WEB_GITHUB_INSTALL_URL || "",
        GLOBAL_GITLAB_CLIENT_ID: process.env.GLOBAL_GITLAB_CLIENT_ID || "",
        GLOBAL_GITLAB_REDIRECT_URL: process.env.GLOBAL_GITLAB_REDIRECT_URL || "",
        WEB_GITLAB_SCOPES: process.env.WEB_GITLAB_SCOPES || "",
        WEB_GITLAB_OAUTH_URL: process.env.WEB_GITLAB_OAUTH_URL || "",
        WEB_TERMS_AND_CONDITIONS: process.env.WEB_TERMS_AND_CONDITIONS || "",
        WEB_SUPPORT_DOCS_URL: process.env.WEB_SUPPORT_DOCS_URL || "",
        WEB_SUPPORT_DISCORD_INVITE_URL: process.env.WEB_SUPPORT_DISCORD_INVITE_URL || "",
        WEB_SUPPORT_TALK_TO_FOUNDER_URL: process.env.WEB_SUPPORT_TALK_TO_FOUNDER_URL || "",
        WEB_BITBUCKET_INSTALL_URL: process.env.WEB_BITBUCKET_INSTALL_URL || "",
        WEB_HOSTNAME_BILLING: process.env.WEB_HOSTNAME_BILLING || "",
        WEB_PORT_BILLING: process.env.WEB_PORT_BILLING || "",
        WEB_TOKEN_DOCS_GITHUB: process.env.WEB_TOKEN_DOCS_GITHUB || "",
        WEB_TOKEN_DOCS_GITLAB: process.env.WEB_TOKEN_DOCS_GITLAB || "",
        WEB_TOKEN_DOCS_BITBUCKET: process.env.WEB_TOKEN_DOCS_BITBUCKET || "",
        WEB_TOKEN_DOCS_AZUREREPOS: process.env.WEB_TOKEN_DOCS_AZUREREPOS || "",
        WEB_HOSTNAME_MCP_MANAGER: process.env.WEB_HOSTNAME_MCP_MANAGER || "",
        WEB_PORT_MCP_MANAGER: process.env.WEB_PORT_MCP_MANAGER || "",
        WEB_RULE_FILES_DOCS: process.env.WEB_RULE_FILES_DOCS || "",
        WEB_ANALYTICS_SECRET: process.env.WEB_ANALYTICS_SECRET || "",
        WEB_ANALYTICS_HOSTNAME: process.env.WEB_ANALYTICS_HOSTNAME || "",
        WEB_PORT_ANALYTICS: process.env.WEB_PORT_ANALYTICS || "",
    };

    return NextResponse.json(env, {
        headers: {
            // 短期缓存，避免频繁请求但保持配置更新
            "Cache-Control": "public, max-age=60, s-maxage=60",
        },
    });
}

// 强制动态渲染，确保每次都读取最新的环境变量
export const dynamic = "force-dynamic";
