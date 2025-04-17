"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Paperclip, Send, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [textSubmission, setTextSubmission] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [comment, setComment] = useState("")
  const [isDone, setIsDone] = useState(false)

  // Mock assignment data
  const assignment = {
    id: params.id,
    title: "Programming Assignment #3",
    className: "Introduction to Computer Science",
    teacherName: "Dr. Smith",
    dueDate: new Date(2025, 3, 20, 23, 59), // April 20, 2025, 11:59 PM
    description:
      "In this assignment, you will implement a simple data structure and algorithm to solve a real-world problem. You will need to write code that efficiently processes a large dataset and produces the correct output according to the specifications below.\n\nRequirements:\n1. Implement a binary search tree data structure\n2. Write functions to insert, deletee, and search for elements\n3. Implement a traversal algorithm to print all elements in order\n4. Write a function to find the height of the tree\n5. Include proper error handling and edge cases\n\nYour submission should include well-documented code with comments explaining your approach and any design decisions you made.\n\nGood luck!",
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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit() {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Assignment submitted",
        description: "Your assignment has been submitted successfully.",
      })

      // Reset form
      setTextSubmission("")
      setFiles([])
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your assignment.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleAddComment() {
    if (!comment.trim()) return

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Comment added",
        description: "Your comment has been added successfully.",
      })

      // Reset form
      setComment("")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding your comment.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        Back to Assignments
      </Button>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription>
                    {assignment.className} • {assignment.teacherName}
                  </CardDescription>
                </div>
                <Badge className="text-red-500 bg-red-50">
                  Due {format(assignment.dueDate, "MMM d, yyyy 'at' h:mm a")}
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
              <CardTitle>Your Submission</CardTitle>
              <CardDescription>Submit your assignment before the due date.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {assignment.submissionType.includes("text") && (
                  <div className="space-y-2">
                    <Label htmlFor="text-submission">Text Submission</Label>
                    <Textarea
                      id="text-submission"
                      placeholder="Type your submission here..."
                      value={textSubmission}
                      onChange={(e) => setTextSubmission(e.target.value)}
                      rows={8}
                    />
                  </div>
                )}

                {assignment.submissionType.includes("file") && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="file-submission">File Submission</Label>
                      <Input id="file-submission" type="file" onChange={handleFileChange} multiple />
                    </div>

                    {files.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Uploaded Files:</h4>
                        <ul className="space-y-2">
                          {files.map((file, index) => (
                            <li key={index} className="flex items-center justify-between rounded-md border p-2">
                              <div className="flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                <span className="text-sm">{file.name}</span>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                Remove
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mark-done"
                    checked={isDone}
                    onCheckedChange={(checked) => setIsDone(checked as boolean)}
                  />
                  <label
                    htmlFor="mark-done"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mark as done
                  </label>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || (files.length === 0 && !textSubmission)}
                  className="w-full"
                >
                  {isSubmitting ? "Submitting..." : "Submit Assignment"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {assignment.allowComments && (
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>Discuss this assignment with your teacher and classmates.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    {assignment.comments.map((comment) => (
                      <div key={comment.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{comment.author}</div>
                            <Badge variant="outline">{comment.authorRole === "teacher" ? "Teacher" : "Student"}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(comment.timestamp, "MMM d, yyyy 'at' h:mm a")}
                          </div>
                        </div>
                        <p className="mt-2">{comment.content}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex items-center gap-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="icon" onClick={handleAddComment} disabled={!comment.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submission Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Status:</div>
                  <Badge variant="outline">Not Submitted</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Due Date:</div>
                  <div className="text-sm">{format(assignment.dueDate, "MMM d, yyyy")}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Due Time:</div>
                  <div className="text-sm">{format(assignment.dueDate, "h:mm a")}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Submission Types:</div>
                  <div className="text-sm">
                    {assignment.submissionType
                      .map((type) => (type === "file" ? "File Upload" : "Text Entry"))
                      .join(", ")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
