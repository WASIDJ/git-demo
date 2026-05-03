import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold">欢迎</h1>
      <div className="text-center space-y-2">
        <p className="text-lg">
          {session.user.name ? `你好，${session.user.name}` : "你好！"}
        </p>
        <p className="text-sm text-gray-500">{session.user.email}</p>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          type="submit"
          className="bg-red-600 text-white rounded px-6 py-2 text-sm font-medium hover:bg-red-700"
        >
          退出登录
        </button>
      </form>
    </div>
  );
}
