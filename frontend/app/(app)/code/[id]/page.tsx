// This page will be rendered for routes like: "/code/[any-id]"", where "[any-id]"" is a dynamic segment.
// Examples:
//  - /code/123
//  - /code/problem-1
//  - /code/two-sum

import { Playground, User } from "@/lib/types"
import { currentUser } from "@clerk/nextjs/server"
import dynamic from "next/dynamic"
import { redirect } from "next/navigation"

const getUserData = async (id: string) => {
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_WORKER_URL}/api/user?id=${id}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_WORKERS_KEY}`,
      },
    }
  )
  const userData: User = await userRes.json()
  return userData
}

const getPlaygroundData = async (id: string) => {
  const playgroundRes = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_WORKER_URL}/api/playground?id=${id}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_WORKERS_KEY}`,
      },
    }
  )
  const playgroundData: Playground = await playgroundRes.json()
  return playgroundData
}


const PlaygroundSandbox = dynamic(() => import("@/components/editor"), {
  ssr: false,
  // loading: () => <Loading />, TODO: Implement loading component.
})

export default async function PlaygroundPage({ params }: { params: { id: string } }) {
  const user = await currentUser();
  const playgroundId = params.id

  if (!user) {
    redirect("/")
  }

  const userData = await getUserData(user.id)
  const playgroundData = await getPlaygroundData(playgroundId)

  return (
    <div className="overflow-hidden overscroll-none w-screen flex flex-col h-screen bg-background">
      {/* TODO: NavBar component here. Props: UserData, PlaygroundData, IsShared?. */}
      <div className="w-screen flex grow">
        <PlaygroundSandbox
          userData={userData} 
          playgroundData={playgroundData}
        />
      </div>
    </div>
  )
}