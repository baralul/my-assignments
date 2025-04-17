"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, ArrowLeft, Copy, Users, BookOpen, MessageSquare, MoreVertical, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ClassDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isCodeCopied, setIsCodeCopied] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [studentToRemove, setStudentToRemove] = useState<string | null>(null)

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
    password: "cs101",
    code: params.id === "1" ? "CS101-XYZ" : params.id === "2" ? "MATH202-ABC" : "PHYS101-DEF",
    studentLimit: params.id === "1" ? 32 : params.id === "2" ? 18 : 25,
    students: params.id === "1" ? 32 : params.id === "2" ? 18 : 25,
  }

  // Mock student data
  const students = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "",
      joinedDate: "2025-01-15",
      lastActive: "2025-04-16",
      submissionRate: "90%",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "",
      joinedDate: "2025-01-16",
      lastActive: "2025-04-15",
      submissionRate: "85%",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      avatar: "",
      joinedDate: "2025-01-18",
      lastActive: "2025-04-14",
      submissionRate: "75%",
    },
  ]

  // Mock assignments data
  const assignments = [
    {
      id: "1",
      title: "Programming Assignment #3",
      dueDate: "2025-04-20",
      submissions: 25,
      totalStudents: 32,
      createdAt: "2025-04-10",
    },
    {
      id: "2",
      title: "Midterm Exam",
      dueDate: "2025-04-15",
      submissions: 30,
      totalStudents: 32,
      createdAt: "2025-04-05",
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

  const copyClassCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setIsCodeCopied(true)

    toast({
      title: "Class code copied",
      description: "The class code has been copied to your clipboard.",
    })

    setTimeout(() => setIsCodeCopied(false), 2000)
  }

  const handleDeleteClass = () => {
    // In a real app, this would be an API call
    toast({
      title: "Class deleted",
      description: `${classData.name} has been deleted successfully.`,
    })
    router.push("/teacher/classes")
  }

  const handleRemoveStudent = (studentId: string) => {
    // In a real app, this would be an API call
    toast({
      title: "Student removed",
      description: `${students.find((s) => s.id === studentId)?.name} has been removed from the class.`,
    })
    setStudentToRemove(null)
  }

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
        <div className="flex gap-2">
          <Button onClick={() => router.push(`/teacher/classes/${params.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Class
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/teacher/classes/${params.id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Class
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Class
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Students</CardTitle>
                  <CardDescription>Students enrolled in this class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <p className="text-sm">Joined: {student.joinedDate}</p>
                          <p className="text-sm">Submission Rate: {student.submissionRate}</p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/teacher/students/${student.id}`)}
                            >
                              View Profile
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                              onClick={() => setStudentToRemove(student.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Class Assignments</CardTitle>
                    <CardDescription>Assignments for this class</CardDescription>
                  </div>
                  <Button onClick={() => router.push("/teacher/assignments/create")}>Create Assignment</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                            <p className="text-sm text-muted-foreground">
                              Submissions: {assignment.submissions}/{assignment.totalStudents}
                            </p>
                            <p className="text-sm text-muted-foreground">Created: {assignment.createdAt}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/teacher/assignments/${assignment.id}`)}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => router.push(`/teacher/assignments/${assignment.id}/submissions`)}
                          >
                            View Submissions
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Class Updates</CardTitle>
                    <CardDescription>Updates posted to this class</CardDescription>
                  </div>
                  <Button onClick={() => router.push("/teacher/updates/create")}>Post Update</Button>
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/teacher/updates/${update.id}`)}
                          >
                            View Details
                          </Button>
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
                  <span className="text-sm font-medium">Class Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{classData.code}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyClassCode(classData.code)}
                      className="h-6 w-6"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Password:</span>
                  <span className="text-sm">{classData.password}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Students:</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">
                      {classData.students}/{classData.studentLimit}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Assignments:</span>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-sm">{assignments.length}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Updates:</span>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm">{updates.length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Class Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Submission Rates</h3>
                  <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                    <div className="bg-green-500" style={{ width: "75%" }} />
                    <div className="bg-red-500" style={{ width: "15%" }} />
                    <div className="bg-gray-500" style={{ width: "10%" }} />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span>On Time: 75%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <span>Late: 15%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-gray-500" />
                      <span>Not Submitted: 10%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New Submissions:</span>
                      <Badge>12 today</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Comments:</span>
                      <Badge variant="outline">8 today</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Class Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this class?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the class and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteClass} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Student Confirmation Dialog */}
      <AlertDialog open={!!studentToRemove} onOpenChange={() => setStudentToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove student from class?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {students.find((s) => s.id === studentToRemove)?.name} from this class. They will no
              longer have access to class materials, assignments, or updates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => studentToRemove && handleRemoveStudent(studentToRemove)}
              className="bg-red-600 hover:bg-red-700"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
