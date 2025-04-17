"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isPremium, setIsPremium] = useState(false) // In a real app, this would come from user data

  // Mock student data
  const student = {
    id: params.id,
    name: params.id === "1" ? "John Doe" : params.id === "2" ? "Jane Smith" : "Bob Johnson",
    email: `${params.id === "1" ? "john.doe" : params.id === "2" ? "jane.smith" : "bob.johnson"}@example.com`,
    avatar: "",
    about: "I am a student interested in learning new things.",
    joinedDate: "2025-01-15",
    lastActive: "2025-04-16",
  }

  // Mock classes data
  const enrolledClasses = [
    {
      id: "1",
      name: "Introduction to Computer Science",
      joinedDate: "2025-01-15",
      submissionRate: "90%",
    },
    {
      id: "3",
      name: "Physics 101",
      joinedDate: "2025-01-20",
      submissionRate: "85%",
    },
  ]

  // Mock assignments data
  const assignments = [
    {
      id: "1",
      title: "Programming Assignment #3",
      className: "Introduction to Computer Science",
      dueDate: "2025-04-20",
      submittedDate: "2025-04-18",
      status: "on-time",
    },
    {
      id: "2",
      title: "Midterm Exam",
      className: "Introduction to Computer Science",
      dueDate: "2025-04-15",
      submittedDate: "2025-04-15",
      status: "on-time",
    },
    {
      id: "4",
      title: "Lab Report",
      className: "Physics 101",
      dueDate: "2025-04-25",
      submittedDate: null,
      status: "not-submitted",
    },
  ]

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Students
      </Button>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-2xl font-bold">{student.name}</h2>
                <p className="text-muted-foreground">{student.email}</p>
                <div className="mt-4 space-y-2 text-left">
                  <p className="text-sm">
                    <span className="font-medium">Joined:</span> {student.joinedDate}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Last Active:</span> {student.lastActive}
                  </p>
                </div>
                <div className="mt-6">
                  <Button className="w-full" disabled={!isPremium}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat with Student
                  </Button>
                  {!isPremium && (
                    <p className="mt-2 text-xs text-muted-foreground">Chat is a premium feature. Upgrade to access.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{student.about}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enrolled Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledClasses.map((cls) => (
                  <div key={cls.id} className="rounded-lg border p-3">
                    <h3 className="font-medium">{cls.name}</h3>
                    <div className="mt-1 flex justify-between text-sm">
                      <span>Joined: {cls.joinedDate}</span>
                      <span>Submission Rate: {cls.submissionRate}</span>
                    </div>
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => router.push(`/teacher/classes/${cls.id}`)}
                      >
                        View Class
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Not ready yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Performance analytics will be available soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assignment Submissions</CardTitle>
              <CardDescription>History of student's assignment submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="submitted">Submitted</TabsTrigger>
                  <TabsTrigger value="not-submitted">Not Submitted</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <div className="space-y-4 mt-4">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{assignment.title}</h3>
                            <p className="text-sm text-muted-foreground">{assignment.className}</p>
                          </div>
                          {assignment.status === "on-time" ? (
                            <Badge className="bg-green-500">On Time</Badge>
                          ) : assignment.status === "late" ? (
                            <Badge className="bg-red-500">Late</Badge>
                          ) : (
                            <Badge variant="outline">Not Submitted</Badge>
                          )}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span>Due: {assignment.dueDate}</span>
                          {assignment.submittedDate && <span>Submitted: {assignment.submittedDate}</span>}
                        </div>
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(`/teacher/assignments/${assignment.id}/submissions/${student.id}`)
                            }
                          >
                            View Submission
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="submitted">
                  <div className="space-y-4 mt-4">
                    {assignments
                      .filter((a) => a.status === "on-time" || a.status === "late")
                      .map((assignment) => (
                        <div key={assignment.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{assignment.title}</h3>
                              <p className="text-sm text-muted-foreground">{assignment.className}</p>
                            </div>
                            {assignment.status === "on-time" ? (
                              <Badge className="bg-green-500">On Time</Badge>
                            ) : (
                              <Badge className="bg-red-500">Late</Badge>
                            )}
                          </div>
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <span>Due: {assignment.dueDate}</span>
                            <span>Submitted: {assignment.submittedDate}</span>
                          </div>
                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                router.push(`/teacher/assignments/${assignment.id}/submissions/${student.id}`)
                              }
                            >
                              View Submission
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="not-submitted">
                  <div className="space-y-4 mt-4">
                    {assignments
                      .filter((a) => a.status === "not-submitted")
                      .map((assignment) => (
                        <div key={assignment.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{assignment.title}</h3>
                              <p className="text-sm text-muted-foreground">{assignment.className}</p>
                            </div>
                            <Badge variant="outline">Not Submitted</Badge>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <span>Due: {assignment.dueDate}</span>
                          </div>
                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/teacher/assignments/${assignment.id}`)}
                            >
                              View Assignment
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
