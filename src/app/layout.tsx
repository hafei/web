import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@components/ui/toaster/toaster";
import { TooltipProvider } from "@components/ui/tooltip";
import { GoogleTagManager } from "@next/third-parties/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import QueryProvider from "src/core/providers/query.provider";
import { cn } from "src/core/utils/components";

import "./globals.css";

// 使用本地字体，避免构建时访问 Google Fonts
const dm_sans = localFont({
    src: [
        { path: "../../public/fonts/dm-sans-400.woff2", weight: "400", style: "normal" },
        { path: "../../public/fonts/dm-sans-500.woff2", weight: "500", style: "normal" },
        { path: "../../public/fonts/dm-sans-600.woff2", weight: "600", style: "normal" },
        { path: "../../public/fonts/dm-sans-700.woff2", weight: "700", style: "normal" },
    ],
    variable: "--font-dm-sans",
    display: "swap",
});

const overpass_mono = localFont({
    src: [
        { path: "../../public/fonts/overpass-mono-400.woff2", weight: "400", style: "normal" },
        { path: "../../public/fonts/overpass-mono-700.woff2", weight: "700", style: "normal" },
    ],
    variable: "--font-overpass-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Kodus",
        template: "%s | Kodus",
    },
    icons: { icon: "/favicon.ico" },
    openGraph: {
        locale: "en_US",
        type: "website",
        siteName: "Kodus",
        title: {
            default: "Kodus",
            template: "%s | Kodus",
        },
    },
};

// 强制动态渲染，确保环境变量在运行时读取
export const dynamic = "force-dynamic";

/**
 * 在服务端获取环境变量
 * 由于 layout 是 Server Component，这里的 process.env 会在每次请求时读取
 */
function getServerEnv() {
    return {
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
}

export default function RootLayout({ children }: React.PropsWithChildren) {
    // 在服务端获取运行时环境变量
    const serverEnv = getServerEnv();

    return (
        <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
            <GoogleTagManager gtmId="GTM-KN2J57G" />

            <body
                className={cn(
                    "bg-background text-text-primary flex h-screen w-screen flex-col overflow-hidden",
                    overpass_mono.className,
                    dm_sans.className,
                )}>
                <TooltipProvider delayDuration={0} skipDelayDuration={0}>
                    <QueryProvider>
                        <NuqsAdapter>
                            {children}
                            <Toaster />
                        </NuqsAdapter>
                    </QueryProvider>
                </TooltipProvider>

                {/* 
                    将环境变量注入到 window.__ENV__
                    由于 layout 使用 force-dynamic，这会在每次请求时运行
                */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.__ENV__ = ${JSON.stringify(serverEnv)};`,
                    }}
                />
            </body>
        </html>
    );
}
