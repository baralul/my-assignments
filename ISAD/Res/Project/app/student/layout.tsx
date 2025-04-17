"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, Calendar, LayoutDashboard, MessageSquare, Users, User, Bell } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardFooter } from "@/components/dashboard-footer"
import { useAuth } from "@/lib/auth-context"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "My Classes",
    href: "/student/classes",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Assignments",
    href: "/student/assignments",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Calendar",
    href: "/student/calendar",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Updates",
    href: "/student/updates",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Notifications",
    href: "/student/notifications",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/student/profile",
    icon: <User className="h-5 w-5" />,
  },
]

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader sidebarNavItems={sidebarNavItems} />
      <div className="flex flex-1">
        <DashboardSidebar items={sidebarNavItems} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      <DashboardFooter />
    </div>
  )
}
