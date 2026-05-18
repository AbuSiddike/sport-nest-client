"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button, Card, Input, Label, Separator, TextField } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FiUserPlus } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { validatePassword } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photo: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "password") setPasswordErrors(validatePassword(value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validatePassword(form.password);
    if (errors.length) {
      setPasswordErrors(errors);
      toast.error(errors[0]);
      return;
    }

    setLoading(true);
    await authClient.signUp.email(
      {
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.photo || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Account created! Please sign in.");
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Registration failed. Please try again.");
          setLoading(false);
        },
      },
    );
  }

  async function handleGoogleLogin() {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  }

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
    { name: "photo", label: "Photo URL", type: "url", placeholder: "https://i.ibb.co/your-photo.jpg", required: false },
    { name: "password", label: "Password", type: "password", placeholder: "Min 6 chars, upper & lowercase", required: true },
  ];

  return (
    <section className="page-container flex max-w-md justify-center py-10">
      <Card className="w-full p-6 sm:p-8 max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
            <FiUserPlus size={24} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="mt-1 text-sm text-muted">Join SportNest to book and manage facilities</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((f) => (
            <TextField key={f.name} isRequired={f.required}>
              <Label>{f.label}</Label>
              <Input
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={handleChange}
                required={f.required}
              />
              {f.name === "password" && form.password && passwordErrors.length > 0 && (
                <ul className="mt-1 list-inside list-disc text-xs text-danger">
                  {passwordErrors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )}
            </TextField>
          ))}

          <Button type="submit" variant="primary" className="w-full" isDisabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted">or continue with</span>
          <Separator className="flex-1" />
        </div>

        <Button variant="secondary" className="w-full" onPress={handleGoogleLogin}>
          <FcGoogle size={20} />
          Sign up with Google
        </Button>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-emerald-500 hover:underline">
            Sign In
          </Link>
        </p>
      </Card>
    </section>
  );
}
