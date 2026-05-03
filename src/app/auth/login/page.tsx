import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthForm } from "./auth-form";

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string; registered?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/");

  const { error, registered } = await props.searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 px-4">
        <h1 className="text-2xl font-bold text-center">登录</h1>
        <AuthForm mode="login" error={error} registered={!!registered} />
        <p className="text-center text-sm text-gray-500">
          还没有账号？{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            注册
          </a>
        </p>
      </div>
    </div>
  );
}
