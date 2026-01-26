// Error boundaries must be Client Components
// global-error must include html and body tags
"use client";

import localFont from "next/font/local";
import { Button } from "@components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@components/ui/card";
import { ArrowLeft, XOctagonIcon } from "lucide-react";
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

export default function GlobalError({
    error,
}: {
    error: Error & { digest?: string };
}) {
    return (
        <html lang="en">
            <head>
                <title>Something went wrong!</title>
            </head>

            <body
                className={cn(
                    "bg-background text-text-primary flex h-screen w-screen flex-col items-center justify-center overflow-hidden",
                    dm_sans.className,
                )}>
                <div className="flex w-md flex-col items-center justify-center gap-8">
                    <XOctagonIcon className="text-danger size-16" />

                    <Card className="w-full">
                        <CardHeader className="gap-4 px-8 py-8">
                            <CardTitle className="text-center">
                                Something went wrong!
                            </CardTitle>
                            <CardDescription className="text-center">
                                But don't worry! We're investigating any issues
                                actively and it should be fixed soon.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <div className="flex gap-4">
                        <Button
                            size="sm"
                            variant="cancel"
                            leftIcon={<ArrowLeft />}
                            onClick={() => window.history.back()}>
                            Go back
                        </Button>

                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => {
                                window.location.href = "/";
                            }}>
                            Go to start page
                        </Button>
                    </div>
                </div>
            </body>
        </html>
    );
}
