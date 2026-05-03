"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "@/components/toast";

const errorMessages: Record<string, string> = {
  CredentialsSignin: "邮箱或密码错误",
  MissingCSRF: "登录过期，请刷新页面重试",
  default: "登录失败，请重试",
};

export function AuthForm({
  mode,
  error: urlError,
  registered,
}: {
  mode: "login" | "register";
  error?: string;
  registered?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (registered) {
      toast("注册成功，请登录");
    }
  }, [registered]);

  useEffect(() => {
    if (urlError) {
      toast(errorMessages[urlError] || errorMessages.default, "error");
    }
  }, [urlError]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackUrl: "/",
      redirect: false,
    });

    if (result?.error) {
      toast(errorMessages[result.error] || errorMessages.default, "error");
      setLoading(false);
    } else {
      window.location.href = "/";
    }
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          邮箱
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          密码
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white rounded py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "处理中..." : "登录"}
      </button>
    </form>
  );
}
