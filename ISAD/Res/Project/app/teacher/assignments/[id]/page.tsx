"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Edit, MoreVertical, Paperclip, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
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

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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
    createdAt: new Date(2025, 3, 10, 14, 30), // April 10, 2025, 2:30 PM
    description:
      "In this assignment, you will implement a simple data structure and algorithm to solve a real-world problem. You will need to write code that efficiently processes a large dataset and produces the correct output according to the specifications below.\n\nRequirements:\n1. Implement a binary search tree data structure\n2. Write functions to insert, delete, and search for elements\n3. Implement a traversal algorithm to print all elements in order\n4. Write a function to find the height of the tree\n5. Include proper error handling and edge cases  Write a function to find the height of the tree\n5. Include proper error handling and edge cases\n\nYour submission should include well-documented code with comments explaining your approach and any design decisions you made.\n\nGood luck!",
    submissionType: ["file", "text"],
    allowComments: true,
    attachments: [
      { name: "assignment_spec.pdf", url: "#" },
      { name: "starter_code.zip", url: "#" },
    ],
    comments: [
      {
        id: "1",
        author: "Dr. Smith",
        authorRole: "teacher",
        content: "If you have any questions about the requirements, please ask here.",
        timestamp: new Date(2025, 3, 15, 10, 30),
      },
      {
        id: "2",
        author: "Jane Smith",
        authorRole: "student",
        content: "Is it okay to use a different programming language than what was discussed in class?",
        timestamp: new Date(2025, 3, 15, 14, 45),
      },
      {
        id: "3",
        author: "Dr. Smith",
        authorRole: "teacher",
        content:
          "Yes, you can use any programming language you're comfortable with, as long as you meet all the requirements.",
        timestamp: new Date(2025, 3, 15, 16, 20),
      },
    ],
  }

  const handleDeleteAssignment = () => {
    // In a real app, this would be an API call
    toast({
      title: "Assignment deleted",
      description: `${assignment.title} has been deleted successfully.`,
    })
    router.push("/teacher/assignments")
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Assignments
      </Button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{assignment.title}</h1>
          <p className="text-muted-foreground">{assignment.className}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => router.push(`/teacher/assignments/${params.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Assignment
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/teacher/assignments/${params.id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Assignment
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Assignment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription>{assignment.className}</CardDescription>
                </div>
                <Badge className="text-red-500 bg-red-50">
                  Due {format(assignment.dueDate, "EEE, dd MMM yyyy, HH:mm")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="whitespace-pre-line">{assignment.description}</div>

                {assignment.attachments.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Attachments:</h3>
                    <ul className="space-y-2">
                      {assignment.attachments.map((attachment, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4" />
                          <a href={attachment.url} className="text-sm text-blue-600 hover:underline">
                            {attachment.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>Discussion about this assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignment.comments.map((comment) => (
                  <div key={comment.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{comment.author}</div>
                        <Badge variant="outline">{comment.authorRole === "teacher" ? "Teacher" : "Student"}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(comment.timestamp, "EEE, dd MMM yyyy, HH:mm")}
                      </div>
                    </div>
                    <p className="mt-2">{comment.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Created:</div>
                  <div className="text-sm">{format(assignment.createdAt, "EEE, dd MMM yyyy, HH:mm")}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Due Date:</div>
                  <div className="text-sm">{format(assignment.dueDate, "EEE, dd MMM yyyy")}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Due Time:</div>
                  <div className="text-sm">{format(assignment.dueDate, "HH:mm")}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Submission Types:</div>
                  <div className="text-sm">
                    {assignment.submissionType
                      .map((type) => (type === "file" ? "File Upload" : "Text Entry"))
                      .join(", ")}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Comments:</div>
                  <div className="text-sm">{assignment.allowComments ? "Enabled" : "Disabled"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" onClick={() => router.push(`/teacher/assignments/${params.id}/submissions`)}>
                  View Submissions
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push(`/teacher/assignments/${params.id}/edit`)}
                >
                  Edit Assignment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Assignment Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this assignment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the assignment and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAssignment} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
