import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { User } from "@/lib/types";
import Dashboard from "@/components/dashboard";
import { cookies } from "next/headers"

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
  const userPlaygrounds = Array.isArray(userData.playground) ? userData.playground : [];

    // Parse cookies
    const cookieStore = cookies();
    const layout = cookieStore.get("react-resizable-panels:layout:mail");
    const collapsed = cookieStore.get("react-resizable-panels:collapsed");
  
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
    const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  // TODO: Query information about playgrounds this user has shared.

  return (
    <div className="w-screen h-screen flex flex-col overscroll-none">
      <Dashboard 
        userData={userData}
        playgrounds={userPlaygrounds}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      />
    </div>
  );
}
