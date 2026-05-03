import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 px-4">
        <h1 className="text-2xl font-bold text-center">注册</h1>
        <RegisterForm />
        <p className="text-center text-sm text-gray-500">
          已有账号？{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            登录
          </a>
        </p>
      </div>
    </div>
  );
}
