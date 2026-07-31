import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/app/actions/auth";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}

async function LoginContent() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role === "TRUSTEE") {
    return redirect("/admin");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <form action={signInAction} className="flex flex-col items-center">
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
          className="bg-blue-500 text-white rounded-md p-2 w-64 hover:bg-blue-600 transition-colors duration-300"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
