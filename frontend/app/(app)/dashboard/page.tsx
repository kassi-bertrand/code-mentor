import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { User } from "@/lib/types";

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

  const userData = (await userRes.json()) as User

  // TODO: Query information about playgrounds this user has shared.

  return (
    // The dashboard code will come here. The line below is a placeholder.
    <div>Welcome on the dashboard page! It's currently being implemented by Arya and Aashna</div>
  )
}
