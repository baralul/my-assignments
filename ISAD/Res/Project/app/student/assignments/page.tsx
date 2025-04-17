"use client"

import { useState } from "react"
import { format, differenceInDays } from "date-fns"
import { Calendar, Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AssignmentCard } from "@/components/assignment-card"

export default function AssignmentsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dateParam = searchParams.get("date")

  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock classes data
  const classes = [
    { id: "1", name: "Introduction to Computer Science" },
    { id: "2", name: "Advanced Mathematics" },
    { id: "3", name: "Physics 101" },
  ]

  // Mock assignments data
  const assignments = [
    {
      id: "1",
      title: "Programming Assignment #3",
      className: "Introduction to Computer Science",
      classId: "1",
      dueDate: new Date(2025, 3, 20), // April 20, 2025
      status: "not-submitted",
    },
    {
      id: "2",
      title: "Problem Set 5",
      className: "Advanced Mathematics",
      classId: "2",
      dueDate: new Date(2025, 3, 18), // April 18, 2025
      status: "not-submitted",
    },
    {
      id: "3",
      title: "Lab Report",
      className: "Physics 101",
      classId: "3",
      dueDate: new Date(2025, 3, 25), // April 25, 2025
      status: "not-submitted",
    },
    {
      id: "4",
      title: "Midterm Exam",
      className: "Introduction to Computer Science",
      classId: "1",
      dueDate: new Date(2025, 3, 15), // April 15, 2025
      status: "submitted",
      submittedAt: new Date(2025, 3, 14), // April 14, 2025
    },
  ]

  // Filter assignments based on search query, class filter, and status filter
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = searchQuery === "" || assignment.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesClass = classFilter === "all" || assignment.classId === classFilter

    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter

    // If date filter is applied, only show assignments due on that date
    const matchesDate = !dateParam || format(assignment.dueDate, "yyyy-MM-dd") === dateParam

    return matchesSearch && matchesClass && matchesStatus && matchesDate
  })

  // Sort assignments by due date (closest first)
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    return a.dueDate.getTime() - b.dueDate.getTime()
  })

  // Function to clear the date filter
  const clearDateFilter = () => {
    router.push("/student/assignments", { scroll: false })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Assignments</h1>
        <Button variant="outline" onClick={() => router.push("/student/calendar")}>
          <Calendar className="mr-2 h-4 w-4" />
          Calendar View
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Class:</span>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Classes" />
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
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="not-submitted">Not Submitted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {dateParam && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              Showing assignments due on {format(new Date(dateParam), "MMMM d, yyyy")}
            </Badge>
            <Button variant="ghost" size="sm" onClick={clearDateFilter}>
              Clear filter
            </Button>
          </div>
        </div>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedAssignments
              .filter((assignment) => differenceInDays(assignment.dueDate, new Date()) >= 0)
              .map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} role="student" />
              ))}
            {sortedAssignments.filter((assignment) => differenceInDays(assignment.dueDate, new Date()) >= 0).length ===
              0 && (
              <div className="col-span-full flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">No upcoming assignments</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedAssignments
              .filter((assignment) => differenceInDays(assignment.dueDate, new Date()) < 0)
              .map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} role="student" />
              ))}
            {sortedAssignments.filter((assignment) => differenceInDays(assignment.dueDate, new Date()) < 0).length ===
              0 && (
              <div className="col-span-full flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">No past assignments</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} role="student" />
            ))}
            {sortedAssignments.length === 0 && (
              <div className="col-span-full flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">No assignments available</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
