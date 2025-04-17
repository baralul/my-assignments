"use client"

import type React from "react"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Bell, Crown, HelpCircle, LogOut, Menu, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DashboardHeaderProps {
  sidebarNavItems?: {
    title: string
    href: string
    icon: React.ReactNode
  }[]
}

export function DashboardHeader({ sidebarNavItems }: DashboardHeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Extract current page title from pathname
  const getPageTitle = () => {
    if (!pathname) return "Dashboard"

    const segments = pathname.split("/")
    if (segments.length < 3) return "Dashboard"

    // Get the last segment that's not an ID (doesn't contain numbers)
    const lastSegment = segments[segments.length - 1]
    if (/\d/.test(lastSegment) && segments.length > 3) {
      return segments[segments.length - 2].charAt(0).toUpperCase() + segments[segments.length - 2].slice(1)
    }

    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {sidebarNavItems && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                <div className="flex h-8 items-center gap-2 font-bold text-xl mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M17 11V3H7v8H3v10h18V11h-4Z" />
                    <path d="M10 7V3" />
                    <path d="M14 7V3" />
                  </svg>
                  SIAP
                </div>
                <nav className="flex flex-col gap-4 py-4">
                  {sidebarNavItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-2 px-2 py-1 text-lg font-medium"
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
          <Link
            href={user?.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard"}
            className="flex items-center gap-2 font-bold text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hidden md:block"
            >
              <path d="M17 11V3H7v8H3v10h18V11h-4Z" />
              <path d="M10 7V3" />
              <path d="M14 7V3" />
            </svg>
            SIAP
          </Link>
          <div className="hidden md:block h-6 w-px bg-muted-foreground/20"></div>
          <h1 className="hidden md:block text-lg font-medium">{getPageTitle()}</h1>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => router.push("/teacher/notifications")}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => router.push("/teacher/support")}>
                  <HelpCircle className="h-5 w-5" />
                  <span className="sr-only">Help</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help & Support</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {user?.role === "teacher" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    <span className="sr-only">Premium</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade to Premium</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/teacher/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              {user?.role === "teacher" && (
                <DropdownMenuItem className="md:hidden">
                  <Crown className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>Upgrade to Premium</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => router.push("/teacher/support")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
