"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Clock, MessageSquare, BookOpen } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default function TeacherDashboard() {
  const { user } = useAuth()

  // Mock data for dashboard
  const stats = [
    { title: "Total Classes", value: "5", icon: <BookOpen className="h-5 w-5 text-muted-foreground" /> },
    { title: "Active Assignments", value: "12", icon: <Clock className="h-5 w-5 text-muted-foreground" /> },
    { title: "Students", value: "87", icon: <BookOpen className="h-5 w-5 text-muted-foreground" /> },
    { title: "Unread Comments", value: "8", icon: <MessageSquare className="h-5 w-5 text-muted-foreground" /> },
  ]

  const recentClasses = [
    { id: "1", name: "Introduction to Computer Science", students: 32 },
    { id: "2", name: "Advanced Mathematics", students: 18 },
    { id: "3", name: "Physics 101", students: 25 },
  ]

  const upcomingAssignments = [
    { id: "1", title: "Programming Assignment #3", dueDate: "2025-04-20", class: "Introduction to Computer Science" },
    { id: "2", title: "Problem Set 5", dueDate: "2025-04-18", class: "Advanced Mathematics" },
    { id: "3", title: "Lab Report", dueDate: "2025-04-25", class: "Physics 101" },
  ]

  const recentComments = [
    {
      id: "1",
      studentName: "Jane Smith",
      content: "Is it okay to use a different programming language than what was discussed in class?",
      timestamp: new Date(2025, 3, 15, 14, 45),
      assignmentId: "1",
      assignmentTitle: "Programming Assignment #3",
    },
    {
      id: "2",
      studentName: "Bob Johnson",
      content: "I'm having trouble with problem 3 in the latest problem set. Could you provide some clarification?",
      timestamp: new Date(2025, 3, 16, 9, 30),
      assignmentId: "2",
      assignmentTitle: "Problem Set 5",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <div className="flex gap-2">
          <Link href="/teacher/classes/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Class
            </Button>
          </Link>
          <Link href="/teacher/assignments/create">
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Classes</CardTitle>
            <CardDescription>Your most recently created classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClasses.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{cls.name}</p>
                    <p className="text-sm text-muted-foreground">{cls.students} students</p>
                  </div>
                  <Link href={`/teacher/classes/${cls.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
              <Link href="/teacher/classes" className="block">
                <Button variant="outline" className="w-full">
                  View All Classes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Assignments due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()} • {assignment.class}
                    </p>
                  </div>
                  <Link href={`/teacher/assignments/${assignment.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
              <Link href="/teacher/assignments" className="block">
                <Button variant="outline" className="w-full">
                  View All Assignments
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Comments</CardTitle>
            <CardDescription>Latest comments from students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComments.map((comment) => (
                <div key={comment.id} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{comment.studentName}</p>
                    <p className="text-xs text-muted-foreground">{format(comment.timestamp, "MMM d, HH:mm")}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.assignmentTitle}</p>
                  <p className="mt-1 text-sm line-clamp-2">{comment.content}</p>
                  <div className="mt-2 flex justify-end">
                    <Link href={`/teacher/assignments/${comment.assignmentId}`}>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              <Link href="/teacher/notifications" className="block">
                <Button variant="outline" className="w-full">
                  View All Comments
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
