import React from "react";
import Link from "next/link";

import { Bitcoin, ChevronLeft } from "lucide-react";

import type { Metadata } from "next";

import { buttonVariants } from "~/components/ui/button-variants";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container flex h-dvh w-full flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "sm", variant: "outline" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <span className="inline-flex items-center">
          <ChevronLeft className="mr-2 size-4" />
          Back
        </span>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Bitcoin className="mx-auto size-12" />
          <div className="text-2xl font-semibold tracking-tight">
            <span>Welcome to</span>{" "}
            <span className="font-bold">{siteConfig.name}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter your details to sign in to your account
          </p>
        </div>

        <React.Suspense>
          <LoginForm />
        </React.Suspense>

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our
          <br />
          <Link
            href="/terms"
            className="hover:text-brand underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="hover:text-brand underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
