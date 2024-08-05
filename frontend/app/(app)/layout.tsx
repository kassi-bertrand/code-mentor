
import { User } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


// This layout component is used for all pages within the (app) folder.
// It runs every time a user accesses a page in this folder, ensuring authentication and database synchronization.

export default async function AppAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    // Check if the user is authenticated using Clerk
  const user = await currentUser();

  // If no user is authenticated, redirect to the home page
  if (!user) {
    redirect("/");
  }

  // Attempt to fetch the authenticated user from our database
  const dbUser = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_WORKER_URL}/api/user?id=${user.id}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_WORKERS_KEY}`,
      },
    }
  );
  const dbUserJSON = (await dbUser.json()) as User;


  // If the user doesn't exist in our database, create a new user entry
  if (!dbUserJSON.id) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_WORKER_URL}/api/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.NEXT_PUBLIC_WORKERS_KEY}`,
        },
        body: JSON.stringify({
          id: user.id,
          name: user.username,
          email: user.emailAddresses[0].emailAddress,
        }),
      }
    );
  }

   // Render the child components (i.e., the actual page content)
  return <>{children}</>
}
