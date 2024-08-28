import "./globals.css";

import React from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import { SessionProvider } from "next-auth/react";

import type { Metadata } from "next";

import { Navbar } from "~/components/site-header/navbar";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { siteConfig } from "~/config/site";
import initializeServerI18n from "~/i18n/i18n.server";
import { I18N_COOKIE_NAME } from "~/i18n/i18n.settings";
import I18nProvider from "~/i18n/I18nProvider";
import { auth } from "~/lib/auth";
import * as fonts from "~/lib/fonts";
import { TRPCReactProvider } from "~/lib/trpc/react";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.links.x,
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

const Scene = dynamic(() => import("~/components/canvas/scene"), {
  ssr: false,
});

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const [session, { language }] = await Promise.all([
    auth(),
    initializeServerI18n(getLanguageCookie()),
  ]);

  return (
    <html
      lang={language}
      suppressHydrationWarning
      className={cn(Object.values(fonts).map((font) => font.variable))}
    >
      <body className="min-h-dvh scroll-smooth font-sans antialiased">
        <I18nProvider lang={language}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <SessionProvider>
                <TRPCReactProvider>
                  <Navbar session={session} />
                  {children}

                  <Scene
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100dvw",
                      height: "100dvh",
                      pointerEvents: "none",
                    }}
                  />
                </TRPCReactProvider>
              </SessionProvider>
            </TooltipProvider>
          </ThemeProvider>
        </I18nProvider>

        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  );
}

function getLanguageCookie() {
  return cookies().get(I18N_COOKIE_NAME)?.value;
}
