// This page.tsx will run for the exact route: "/code"
import { redirect } from "next/navigation"

export default function Page() {
  redirect("/")
}
