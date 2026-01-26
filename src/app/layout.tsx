import type { Metadata } from "next";
import { DM_Sans, Overpass_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@components/ui/toaster/toaster";
import { TooltipProvider } from "@components/ui/tooltip";
import { GoogleTagManager } from "@next/third-parties/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import QueryProvider from "src/core/providers/query.provider";
import { cn } from "src/core/utils/components";

import "./globals.css";

const dm_sans = DM_Sans({
    subsets: ["latin"],
    preload: true,
});
const overpass_mono = Overpass_Mono({
    subsets: ["latin"],
    preload: true,
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

export default function RootLayout({ children }: React.PropsWithChildren) {
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



                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.__ENV__ = {
                            WEB_HOSTNAME_API: "${process.env.WEB_HOSTNAME_API || 'localhost'}",
                            WEB_PORT_API: "${process.env.WEB_PORT_API || ''}",
                            NEXTAUTH_URL: "${process.env.NEXTAUTH_URL || ''}",
                            WEB_NODE_ENV: "${process.env.WEB_NODE_ENV || 'production'}",
                            WEB_GITHUB_INSTALL_URL: "${process.env.WEB_GITHUB_INSTALL_URL || ''}",
                            GLOBAL_GITLAB_CLIENT_ID: "${process.env.GLOBAL_GITLAB_CLIENT_ID || ''}",
                            GLOBAL_GITLAB_REDIRECT_URL: "${process.env.GLOBAL_GITLAB_REDIRECT_URL || ''}",
                            WEB_GITLAB_SCOPES: "${process.env.WEB_GITLAB_SCOPES || ''}",
                            WEB_GITLAB_OAUTH_URL: "${process.env.WEB_GITLAB_OAUTH_URL || ''}",
                            WEB_TERMS_AND_CONDITIONS: "${process.env.WEB_TERMS_AND_CONDITIONS || ''}",
                            WEB_SUPPORT_DOCS_URL: "${process.env.WEB_SUPPORT_DOCS_URL || ''}",
                            WEB_SUPPORT_DISCORD_INVITE_URL: "${process.env.WEB_SUPPORT_DISCORD_INVITE_URL || ''}",
                            WEB_SUPPORT_TALK_TO_FOUNDER_URL: "${process.env.WEB_SUPPORT_TALK_TO_FOUNDER_URL || ''}",
                            WEB_BITBUCKET_INSTALL_URL: "${process.env.WEB_BITBUCKET_INSTALL_URL || ''}",
                            WEB_HOSTNAME_BILLING: "${process.env.WEB_HOSTNAME_BILLING || ''}",
                            WEB_PORT_BILLING: "${process.env.WEB_PORT_BILLING || ''}",
                            WEB_TOKEN_DOCS_GITHUB: "${process.env.WEB_TOKEN_DOCS_GITHUB || ''}",
                            WEB_TOKEN_DOCS_GITLAB: "${process.env.WEB_TOKEN_DOCS_GITLAB || ''}",
                            WEB_TOKEN_DOCS_BITBUCKET: "${process.env.WEB_TOKEN_DOCS_BITBUCKET || ''}",
                            WEB_TOKEN_DOCS_AZUREREPOS: "${process.env.WEB_TOKEN_DOCS_AZUREREPOS || ''}",
                            WEB_HOSTNAME_MCP_MANAGER: "${process.env.WEB_HOSTNAME_MCP_MANAGER || ''}",
                            WEB_PORT_MCP_MANAGER: "${process.env.WEB_PORT_MCP_MANAGER || ''}",
                            WEB_RULE_FILES_DOCS: "${process.env.WEB_RULE_FILES_DOCS || ''}",
                            WEB_ANALYTICS_SECRET: "${process.env.WEB_ANALYTICS_SECRET || ''}",
                            WEB_ANALYTICS_HOSTNAME: "${process.env.WEB_ANALYTICS_HOSTNAME || ''}",
                            WEB_PORT_ANALYTICS: "${process.env.WEB_PORT_ANALYTICS || ''}",
                        };
                    `,
                    }}
                />
            </body>
        </html>
    );
}
