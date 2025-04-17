"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [classFilter, setClassFilter] = useState("all")

  // Mock classes data
  const classes = [
    { id: "1", name: "Introduction to Computer Science" },
    { id: "2", name: "Advanced Mathematics" },
    { id: "3", name: "Physics 101" },
  ]

  // Mock students data
  const students = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "",
      classes: ["1", "3"],
      submissionRate: "90%",
      lastActive: "2025-04-16",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "",
      classes: ["1", "2"],
      submissionRate: "85%",
      lastActive: "2025-04-15",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      avatar: "",
      classes: ["2", "3"],
      submissionRate: "75%",
      lastActive: "2025-04-14",
    },
    {
      id: "4",
      name: "Alice Williams",
      email: "alice.williams@example.com",
      avatar: "",
      classes: ["1"],
      submissionRate: "95%",
      lastActive: "2025-04-16",
    },
    {
      id: "5",
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      avatar: "",
      classes: ["3"],
      submissionRate: "80%",
      lastActive: "2025-04-13",
    },
  ]

  // Filter students based on search query and class filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      searchQuery === "" ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesClass = classFilter === "all" || student.classes.includes(classFilter)

    return matchesSearch && matchesClass
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Students</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
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
          <CardTitle>Student List</CardTitle>
          <CardDescription>
            {filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""}
            {classFilter !== "all" ? ` in ${classes.find((c) => c.id === classFilter)?.name}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={student.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {student.classes.map((classId) => (
                          <span key={classId} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {classes.find((c) => c.id === classId)?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-sm">Last Active: {student.lastActive}</p>
                    <p className="text-sm">Submission Rate: {student.submissionRate}</p>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/teacher/students/${student.id}`)}>
                      View Profile
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">No students found</p>
                  <p className="text-xs text-muted-foreground mt-1">Try a different search term or class filter</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
