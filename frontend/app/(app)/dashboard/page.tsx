import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { User } from "@/lib/types";
import "./styles.css";
import VerticalNavBar from "../../../components/navbar";

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
    <div>
      <VerticalNavBar />
      <div className="dashboard">
        <p className="greeting">Hello {userData.name}!</p>
        <div className="grid-container">
          <button className="button">+</button>
          <div className="button-white">
            <div className="blue-bottom"></div>
            <div className="text">PlaygroundName</div>
          </div>
          <div className="button-white">
            <div className="blue-bottom"></div>
            <div className="text">PlaygroundName</div>
          </div>
          <div className="button-white">
            <div className="blue-bottom"></div>
            <div className="text">PlaygroundName</div>
          </div>
          <div className="button-white">
            <div className="blue-bottom"></div>
            <div className="text">PlaygroundName</div>
          </div>
          <div className="button-white">
            <div className="blue-bottom"></div>
            <div className="text">PlaygroundName</div>
          </div>
        </div>
      </div>
    </div>
  );
}
