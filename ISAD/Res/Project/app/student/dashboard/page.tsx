"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const { user } = useAuth()

  // Mock data for dashboard
  const stats = [
    { title: "Enrolled Classes", value: "4" },
    { title: "Pending Assignments", value: "7" },
    { title: "Completed Assignments", value: "15" },
    { title: "Unread Updates", value: "3" },
  ]

  const enrolledClasses = [
    { id: "1", name: "Introduction to Computer Science", teacher: "Dr. Smith" },
    { id: "2", name: "Advanced Mathematics", teacher: "Prof. Johnson" },
    { id: "3", name: "Physics 101", teacher: "Dr. Williams" },
  ]

  const upcomingAssignments = [
    {
      id: "1",
      title: "Programming Assignment #3",
      dueDate: "2025-04-20",
      class: "Introduction to Computer Science",
      status: "pending",
      daysLeft: 2,
    },
    {
      id: "2",
      title: "Problem Set 5",
      dueDate: "2025-04-18",
      class: "Advanced Mathematics",
      status: "pending",
      daysLeft: 0,
    },
    {
      id: "3",
      title: "Lab Report",
      dueDate: "2025-04-25",
      class: "Physics 101",
      status: "pending",
      daysLeft: 7,
    },
  ]

  const getStatusColor = (daysLeft: number) => {
    if (daysLeft < 0) return "text-gray-500" // Overdue
    if (daysLeft === 0) return "text-red-500" // Due today
    if (daysLeft <= 3) return "text-yellow-500" // Due soon
    return "text-green-500" // Due later
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <Link href="/student/classes/join">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Join Class
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>Classes you are enrolled in</CardDescription>
          </CardHeader>
          <CardContent>
            {enrolledClasses.length > 0 ? (
              <div className="space-y-4">
                {enrolledClasses.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-sm text-muted-foreground">Teacher: {cls.teacher}</p>
                    </div>
                    <Link href={`/student/classes/${cls.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
                <Link href="/student/classes" className="block">
                  <Button variant="outline" className="w-full">
                    View All Classes
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">You haven't joined any classes yet</p>
                  <Link href="/student/classes/join" className="mt-2 inline-block">
                    <Button size="sm">Join a Class</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Assignments due soon</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAssignments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.class}</p>
                      <p className={`text-sm ${getStatusColor(assignment.daysLeft)}`}>
                        {assignment.daysLeft < 0
                          ? "Overdue"
                          : assignment.daysLeft === 0
                            ? "Due today"
                            : `Due in ${assignment.daysLeft} days`}
                      </p>
                    </div>
                    <Link href={`/student/assignments/${assignment.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
                <Link href="/student/assignments" className="block">
                  <Button variant="outline" className="w-full">
                    View All Assignments
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">No assignments available</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

