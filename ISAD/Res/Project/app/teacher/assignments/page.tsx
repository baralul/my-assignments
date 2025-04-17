"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Plus, Filter } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function AssignmentsPage() {
  const [classFilter, setClassFilter] = useState("all")
  const [sortBy, setSortBy] = useState("due-time")
  const router = useRouter()

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
      classId: "1",
      className: "Introduction to Computer Science",
      dueDate: new Date(2025, 3, 20), // April 20, 2025
      createdAt: new Date(2025, 3, 10), // April 10, 2025
      submissions: 25,
      totalStudents: 32,
    },
    {
      id: "2",
      title: "Problem Set 5",
      classId: "2",
      className: "Advanced Mathematics",
      dueDate: new Date(2025, 3, 18), // April 18, 2025
      createdAt: new Date(2025, 3, 8), // April 8, 2025
      submissions: 15,
      totalStudents: 18,
    },
    {
      id: "3",
      title: "Lab Report",
      classId: "3",
      className: "Physics 101",
      dueDate: new Date(2025, 3, 25), // April 25, 2025
      createdAt: new Date(2025, 3, 15), // April 15, 2025
      submissions: 20,
      totalStudents: 25,
    },
    {
      id: "4",
      title: "Midterm Exam",
      classId: "1",
      className: "Introduction to Computer Science",
      dueDate: new Date(2025, 3, 15), // April 15, 2025
      createdAt: new Date(2025, 3, 5), // April 5, 2025
      submissions: 30,
      totalStudents: 32,
    },
    {
      id: "5",
      title: "Final Project",
      classId: "2",
      className: "Advanced Mathematics",
      dueDate: new Date(2025, 4, 10), // May 10, 2025
      createdAt: new Date(2025, 3, 20), // April 20, 2025
      submissions: 5,
      totalStudents: 18,
    },
  ]

  // Filter assignments based on selected class
  const filteredAssignments =
    classFilter === "all" ? assignments : assignments.filter((assignment) => assignment.classId === classFilter)

  // Sort assignments based on selected sort option
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.createdAt.getTime() - a.createdAt.getTime()
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime()
      case "due-time":
      default:
        return a.dueDate.getTime() - b.dueDate.getTime()
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Assignments</h1>
        <Link href="/teacher/assignments/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Assignment
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
              Sort by: {sortBy === "due-time" ? "Due Time" : sortBy === "newest" ? "Newest" : "Oldest"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setSortBy("due-time")}>Due Time</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")}>Oldest</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Assignments</CardTitle>
          <CardDescription>
            {filteredAssignments.length} assignment{filteredAssignments.length !== 1 ? "s" : ""}
            {classFilter !== "all" ? ` in ${classes.find((c) => c.id === classFilter)?.name}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedAssignments.map((assignment) => (
              <div key={assignment.id} className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-medium">{assignment.title}</h3>
                    <div className="mt-1 flex flex-col md:flex-row md:items-center md:gap-4">
                      <p className="text-sm text-muted-foreground">{assignment.className}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {format(assignment.dueDate, "EEE, dd MMM yyyy, HH:mm")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Submissions: {assignment.submissions}/{assignment.totalStudents}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2 md:mt-0">
                    <Button variant="outline" onClick={() => router.push(`/teacher/assignments/${assignment.id}`)}>
                      View Details
                    </Button>
                    <Button onClick={() => router.push(`/teacher/assignments/${assignment.id}/submissions`)}>
                      View Submissions
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
