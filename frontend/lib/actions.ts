"use server"

import { revalidatePath } from "next/cache"

export async function createPlayground(body: {
    name: string
    description: string
    visibility: string
    language: string
    userId: string
  }) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_WORKER_URL}/api/playground`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.NEXT_PUBLIC_WORKERS_KEY}`,
        },
        body: JSON.stringify(body),
      }
    )
  
    return await res.text()
  }