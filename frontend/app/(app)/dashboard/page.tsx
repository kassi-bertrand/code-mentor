import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { User } from "@/lib/types";
import VerticalNavBar from "@/components/navbar";
import Dashboard from "@/components/dashboard";

export default async function DashboardPage() {
  const user = await currentUser();

  // If the user is not authenticated, redirect to landing page
  if (!user) {
    redirect("/");
  }

  // Query authenticated user infos from the database
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_WORKER_URL}/api/user?id=${user.id}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_WORKERS_KEY}`,
      },
    }
  );

  const userData = (await userRes.json()) as User;

  // TODO: Query information about playgrounds this user has shared.

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden overscroll-none">
      <VerticalNavBar />
      <Dashboard playgrounds={userData.playground}/>
    </div>
  );
}
