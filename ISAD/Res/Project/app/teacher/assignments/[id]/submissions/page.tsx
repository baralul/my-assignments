"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AssignmentSubmissionsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock assignment data
  const assignment = {
    id: params.id,
    title: params.id === "1" ? "Programming Assignment #3" : params.id === "2" ? "Problem Set 5" : "Lab Report",
    className:
      params.id === "1" || params.id === "4"
        ? "Introduction to Computer Science"
        : params.id === "2" || params.id === "5"
          ? "Advanced Mathematics"
          : "Physics 101",
    dueDate: new Date(2025, 3, 20, 23, 59), // April 20, 2025, 11:59 PM
  }

  // Mock submissions data
  const submissions = [
    {
      studentId: "1",
      studentName: "John Doe",
      avatar: "",
      submittedAt: new Date(2025, 3, 19, 14, 30), // April 19, 2025, 2:30 PM
      status: "on-time",
      files: [
        { name: "solution.py", url: "#" },
        { name: "readme.md", url: "#" },
      ],
      textSubmission:
        "I've implemented the binary search tree as requested. The solution handles all edge cases and includes comprehensive documentation.",
      feedback: "",
    },
    {
      studentId: "2",
      studentName: "Jane Smith",
      avatar: "",
      submittedAt: new Date(2025, 3, 21, 10, 15), // April 21, 2025, 10:15 AM
      status: "late",
      files: [{ name: "bst.java", url: "#" }],
      textSubmission:
        "Here is my implementation of the binary search tree in Java. I've included all the required functions and proper error handling.",
      feedback: "Good work, but submitted late. The implementation is correct and well-documented.",
    },
    {
      studentId: "3",
      studentName: "Bob Johnson",
      avatar: "",
      submittedAt: null,
      status: "not-submitted",
      files: [],
      textSubmission: "",
      feedback: "",
    },
    {
      studentId: "4",
      studentName: "Alice Williams",
      avatar: "",
      submittedAt: new Date(2025, 3, 18, 16, 45), // April 18, 2025, 4:45 PM
      status: "on-time",
      files: [{ name: "assignment3.zip", url: "#" }],
      textSubmission: "Please see the attached zip file for my solution.",
      feedback: "Excellent work! Your implementation is efficient and well-documented.",
    },
    {
      studentId: "5",
      studentName: "Charlie Brown",
      avatar: "",
      submittedAt: new Date(2025, 3, 20, 23, 45), // April 20, 2025, 11:45 PM
      status: "on-time",
      files: [{ name: "solution.js", url: "#" }],
      textSubmission: "I implemented the binary search tree in JavaScript.",
      feedback: "",
    },
  ]

  // Filter submissions based on search query
  const filteredSubmissions = submissions.filter(
    (submission) => searchQuery === "" || submission.studentName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-time":
        return <Badge className="bg-green-500">On Time</Badge>
      case "late":
        return <Badge className="bg-red-500">Late</Badge>
      case "not-submitted":
        return <Badge variant="outline">Not Submitted</Badge>
      default:
        return null
    }
  }

  const getSubmissionTimeText = (submittedAt: Date | null, dueDate: Date) => {
    if (!submittedAt) return null

    const diffInHours = Math.round((submittedAt.getTime() - dueDate.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 0) {
      const hours = Math.abs(diffInHours)
      if (hours < 24) {
        return <span className="text-green-500">Submitted {hours} hours early</span>
      } else {
        const days = Math.floor(hours / 24)
        return <span className="text-green-500">Submitted {days} days early</span>
      }
    } else {
      if (diffInHours < 24) {
        return <span className="text-red-500">Submitted {diffInHours} hours late</span>
      } else {
        const days = Math.floor(diffInHours / 24)
        return <span className="text-red-500">Submitted {days} days late</span>
      }
    }
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Assignment
      </Button>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{assignment.title}</h1>
          <p className="text-muted-foreground">
            {assignment.className} • Due {format(assignment.dueDate, "EEE, dd MMM yyyy, HH:mm")}
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Submissions</CardTitle>
          <CardDescription>
            {filteredSubmissions.length} student{filteredSubmissions.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div key={submission.studentId} className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={submission.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{submission.studentName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{submission.studentName}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        {getStatusBadge(submission.status)}
                        {submission.submittedAt && (
                          <p className="text-sm text-muted-foreground">
                            {format(submission.submittedAt, "EEE, dd MMM yyyy, HH:mm")}
                          </p>
                        )}
                      </div>
                      {submission.submittedAt && (
                        <div className="mt-1 text-sm">
                          {getSubmissionTimeText(submission.submittedAt, assignment.dueDate)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button
                      onClick={() =>
                        router.push(`/teacher/assignments/${params.id}/submissions/${submission.studentId}`)
                      }
                      disabled={submission.status === "not-submitted"}
                    >
                      {submission.status === "not-submitted" ? "No Submission" : "View Submission"}
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
