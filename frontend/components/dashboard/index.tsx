"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Mail } from "@/components/dashboard/mail"
import { accounts, mails } from "@/components/dashboard/data"
import { Playground } from "@/lib/types"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function Dashboard({
    playgrounds,
    defaultLayout,
    defaultCollapsed
}: {
    playgrounds: Playground[]
    defaultLayout: any
    defaultCollapsed: any
}){
    const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)
    const router = useRouter()

    return (
        <div className="flex flex-col h-full w-full">
        <Mail
            accounts={accounts}
            mails={mails}
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            navCollapsedSize={4}
        />
        </div>
      )
}