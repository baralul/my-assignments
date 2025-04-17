"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Plus, Filter } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UpdatesPage() {
  const [classFilter, setClassFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const router = useRouter()

  // Mock classes data
  const classes = [
    { id: "1", name: "Introduction to Computer Science" },
    { id: "2", name: "Advanced Mathematics" },
    { id: "3", name: "Physics 101" },
  ]

  // Mock updates data
  const updates = [
    {
      id: "1",
      title: "Midterm Exam Information",
      classId: "1",
      className: "Introduction to Computer Science",
      content: "Important information about the upcoming midterm exam.",
      createdAt: new Date(2025, 3, 15, 10, 30), // April 15, 2025, 10:30 AM
      hasAttachments: true,
    },
    {
      id: "2",
      title: "Reading Materials for Week 5",
      classId: "1",
      className: "Introduction to Computer Science",
      content: "Please review these materials before next week's lecture.",
      createdAt: new Date(2025, 3, 14, 14, 45), // April 14, 2025, 2:45 PM
      hasAttachments: true,
    },
    {
      id: "3",
      title: "Problem Set 5 Clarification",
      classId: "2",
      className: "Advanced Mathematics",
      content: "Clarification on problem 3 in the latest problem set.",
      createdAt: new Date(2025, 3, 16, 9, 0), // April 16, 2025, 9:00 AM
      hasAttachments: false,
    },
    {
      id: "4",
      title: "Lab Safety Reminder",
      classId: "3",
      className: "Physics 101",
      content: "Important safety reminders for the upcoming lab session.",
      createdAt: new Date(2025, 3, 13, 11, 15), // April 13, 2025, 11:15 AM
      hasAttachments: false,
    },
  ]

  // Filter updates based on selected class
  const filteredUpdates = classFilter === "all" ? updates : updates.filter((update) => update.classId === classFilter)

  // Sort updates based on selected sort option
  const sortedUpdates = [...filteredUpdates].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime()
      case "class-name":
        return a.className.localeCompare(b.className)
      case "newest":
      default:
        return b.createdAt.getTime() - a.createdAt.getTime()
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Updates</h1>
        <Link href="/teacher/updates/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post Update
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by Class:</span>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Sort by: {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : "Class Name"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")}>Oldest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("class-name")}>Class Name</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Updates</CardTitle>
          <CardDescription>
            {filteredUpdates.length} update{filteredUpdates.length !== 1 ? "s" : ""}
            {classFilter !== "all" ? ` in ${classes.find((c) => c.id === classFilter)?.name}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedUpdates.map((update) => (
              <div key={update.id} className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-medium">{update.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{update.className}</p>
                    <p className="mt-2">{update.content}</p>
                  </div>
                  <div className="mt-3 flex flex-col items-end gap-2 md:mt-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {format(update.createdAt, "EEE, dd MMM yyyy, HH:mm")}
                      </p>
                      {update.hasAttachments && <Badge variant="outline">Has attachments</Badge>}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/teacher/updates/${update.id}`)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
