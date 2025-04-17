"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DashboardSidebarProps {
  items: {
    title: string
    href: string
    icon: React.ReactNode
  }[]
}

export function DashboardSidebar({ items }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "relative border-r bg-muted/40 transition-all duration-300 ease-in-out hidden md:block",
        collapsed ? "w-[70px]" : "w-[240px]",
      )}
    >
      <div className="flex h-full max-h-screen flex-col gap-2 p-4">
        <nav className="grid gap-1 py-4">
          {items
            .filter((item) => item.title !== "Chat")
            .map((item, index) =>
              collapsed ? (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted",
                          pathname === item.href ? "bg-muted" : "transparent",
                        )}
                      >
                        {item.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted",
                    pathname === item.href ? "bg-muted" : "transparent",
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ),
            )}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
