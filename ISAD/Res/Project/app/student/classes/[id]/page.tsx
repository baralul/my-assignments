"use client"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function StudentClassDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Mock class data
  const classData = {
    id: params.id,
    name:
      params.id === "1"
        ? "Introduction to Computer Science"
        : params.id === "2"
          ? "Advanced Mathematics"
          : "Physics 101",
    description: "A comprehensive introduction to the fundamentals of computer science.",
    teacherName: "Dr. Smith",
    code: params.id === "1" ? "CS101-XYZ" : params.id === "2" ? "MATH202-ABC" : "PHYS101-DEF",
    studentCount: params.id === "1" ? 32 : params.id === "2" ? 18 : 25,
    joinDate: "2025-01-15",
  }

  // Mock assignments data
  const assignments = [
    {
      id: "1",
      title: "Programming Assignment #3",
      dueDate: new Date(2025, 3, 20), // April 20, 2025
      status: "not-submitted",
      createdAt: "2025-04-10",
    },
    {
      id: "2",
      title: "Midterm Exam",
      dueDate: new Date(2025, 3, 15), // April 15, 2025
      status: "submitted",
      createdAt: "2025-04-05",
      submittedAt: "2025-04-14",
    },
  ]

  // Mock updates data
  const updates = [
    {
      id: "1",
      title: "Midterm Exam Information",
      content: "Important information about the upcoming midterm exam.",
      createdAt: "2025-04-15 10:30",
      hasAttachments: true,
    },
    {
      id: "2",
      title: "Reading Materials for Week 5",
      content: "Please review these materials before next week's lecture.",
      createdAt: "2025-04-14 14:45",
      hasAttachments: true,
    },
  ]

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Classes
      </Button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{classData.name}</h1>
          <p className="text-muted-foreground">{classData.description}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Tabs defaultValue="assignments" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="assignments">
              <Card>
                <CardHeader>
                  <CardTitle>Class Assignments</CardTitle>
                  <CardDescription>Assignments for this class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-sm text-muted-foreground">
                              Due: {format(assignment.dueDate, "MMM d, yyyy")}
                            </p>
                            <Badge>{assignment.status === "submitted" ? "Submitted" : "Not Submitted"}</Badge>
                          </div>
                        </div>
                        <Button onClick={() => router.push(`/student/assignments/${assignment.id}`)}>
                          View Assignment
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates">
              <Card>
                <CardHeader>
                  <CardTitle>Class Updates</CardTitle>
                  <CardDescription>Updates posted to this class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {updates.map((update) => (
                      <div key={update.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{update.title}</h3>
                          {update.hasAttachments && <Badge variant="outline">Has attachments</Badge>}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{update.content}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Posted: {update.createdAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Teacher:</span>
                  <span className="text-sm">{classData.teacherName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Joined:</span>
                  <span className="text-sm">{classData.joinDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Students:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{classData.studentCount}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teacher</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {classData.teacherName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{classData.teacherName}</h3>
                  <p className="text-sm text-muted-foreground">Professor</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
