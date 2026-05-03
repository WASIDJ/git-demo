"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/toast";

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";
    const name = (formData.get("name") as string) || "";

    if (!email || !password) {
      toast("请填写所有字段", "error");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast("密码至少 6 位", "error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast(data.error || "注册失败", "error");
        setLoading(false);
        return;
      }

      toast("注册成功");
      setTimeout(() => router.push("/auth/login?registered=1"), 500);
    } catch {
      toast("网络错误，请重试", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          昵称（可选）
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="你的昵称"
        />
      </div>
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
          minLength={6}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="至少 6 位"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white rounded py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "处理中..." : "注册"}
      </button>
    </form>
  );
}
