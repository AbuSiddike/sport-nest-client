"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button, Card, Input, Label, Separator, TextField } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Welcome back!");
          router.push(redirectTo);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Invalid email or password");
          setLoading(false);
        },
      },
    );
  }

  async function handleGoogleLogin() {
    await authClient.signIn.social({ provider: "google", callbackURL: redirectTo });
  }

  return (
    <section className="page-container flex max-w-md justify-center py-12">
      <Card className="w-full p-6 sm:p-8 max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
            <FiLogIn size={24} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-1 text-sm text-muted">Sign in to your SportNest account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField isRequired>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-border bg-surface"
            />
          </TextField>

          <TextField isRequired>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-border bg-surface"
            />
          </TextField>

          <Button type="submit" variant="primary" className="w-full" isDisabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted">or continue with</span>
          <Separator className="flex-1" />
        </div>

        <Button variant="secondary" className="w-full" onPress={handleGoogleLogin}>
          <FcGoogle size={20} />
          Sign in with Google
        </Button>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-emerald-500 hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading login..." />}>
      <LoginForm />
    </Suspense>
  );
}
