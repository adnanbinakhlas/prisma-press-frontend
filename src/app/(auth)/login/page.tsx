"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconLogin2 } from "@tabler/icons-react";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md border-border/50 shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl border bg-muted">
          <IconLogin2 size={24} />
        </div>

        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>

        <CardDescription>Sign in to access your account</CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Create account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
