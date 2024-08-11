import "./globals.css";

import React from "react";
import dynamic from "next/dynamic";

import { TailwindIndicator } from "~/components/tailwind-indicator";
import { ThemeProvider } from "~/components/theme-provider";
import * as fonts from "~/lib/fonts";
import { TRPCReactProvider } from "~/lib/trpc/react";
import { cn } from "~/lib/utils";

export const metadata = {
  title: "Next.js + TypeScript Starter",
  description: "A starter template for Next.js and TypeScript",
};

const Scene = dynamic(() => import("~/components/canvas/scene"), {
  ssr: false,
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(Object.values(fonts).map((font) => font.variable))}
    >
      <body className="min-h-dvh scroll-smooth font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <div className="relative">
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
            </div>
          </TRPCReactProvider>
        </ThemeProvider>

        <TailwindIndicator />
      </body>
    </html>
  );
}
