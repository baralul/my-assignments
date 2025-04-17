"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function UpdatesPage() {
  const [classFilter, setClassFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
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
  ]

  // Filter updates based on search query and class filter
  const filteredUpdates = updates.filter((update) => {
    const matchesSearch =
      searchQuery === "" ||
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesClass = classFilter === "all" || update.classId === classFilter

    return matchesSearch && matchesClass
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Updates</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search updates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Updates</CardTitle>
          <CardDescription>
            {filteredUpdates.length} update{filteredUpdates.length !== 1 ? "s" : ""}
            {classFilter !== "all" ? ` in ${classes.find((c) => c.id === classFilter)?.name}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUpdates.length > 0 ? (
            <div className="space-y-4">
              {filteredUpdates.map((update) => (
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
                      <Button variant="outline" size="sm" onClick={() => router.push(`/student/updates/${update.id}`)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">No updates yet</p>
                <p className="text-xs text-muted-foreground mt-1">Updates from your classes will appear here</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
