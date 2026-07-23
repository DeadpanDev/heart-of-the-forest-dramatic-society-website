"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsLoading(true);

    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Login failed.");
        return;
      }

      setTimeout(() => {
        router.replace("/admin");
        router.refresh();
      }, 1500);
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <form action={handleSubmit} className="flex flex-col items-center">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border border-gray-300 rounded-md p-2 mb-4 w-64"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border border-gray-300 rounded-md p-2 mb-4 w-64"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white rounded-md p-2 w-64 hover:bg-blue-600 transition-colors duration-300"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        {error && <p className="mt-3 w-64 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
