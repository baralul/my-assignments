"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, LayoutDashboard, MessageSquare, Users, User, BarChart, Bell, GraduationCap } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardFooter } from "@/components/dashboard-footer"
import { useAuth } from "@/lib/auth-context"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/teacher/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Classes",
    href: "/teacher/classes",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Students",
    href: "/teacher/students",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Assignments",
    href: "/teacher/assignments",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Updates",
    href: "/teacher/updates",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/teacher/analytics",
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    title: "Notifications",
    href: "/teacher/notifications",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/teacher/profile",
    icon: <User className="h-5 w-5" />,
  },
]

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "teacher")) {
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
