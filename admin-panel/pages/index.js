import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  return <Layout>
    <div className="text-blue-900 flex justify-between">
      <h2>
        Hello, <b>{session?.user?.email.split('@')[0]}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        {session?.user?.picture && (
          <img src={session?.user?.picture} alt="" className="w-6 h-6" />
        )}

        <span className="px-2">
          {session?.user?.email}
        </span>
      </div>
    </div>
  </Layout>
}
