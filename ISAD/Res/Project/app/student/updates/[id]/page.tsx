"use client"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Paperclip } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UpdateDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Mock update data
  const update = {
    id: params.id,
    title: params.id === "1" ? "Midterm Exam Information" : "Reading Materials for Week 5",
    className: "Introduction to Computer Science",
    teacherName: "Dr. Smith",
    content:
      params.id === "1"
        ? "Important information about the upcoming midterm exam. Please make sure to review all course materials from weeks 1-5. The exam will cover all topics discussed in class including algorithms, data structures, and programming concepts. You are allowed one page of notes (front and back) and a basic calculator. The exam will be 2 hours long and will be held in our regular classroom."
        : "Please review these materials before next week's lecture. The reading includes chapters 7-9 from the textbook as well as the supplemental papers shared on the class portal. We will be discussing these concepts in detail during the next session, so it's important to come prepared with questions and insights.",
    createdAt: new Date(2025, 3, 15, 10, 30), // April 15, 2025, 10:30 AM
    attachments: [
      { name: "midterm_study_guide.pdf", url: "#" },
      { name: "practice_questions.pdf", url: "#" },
    ],
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Updates
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{update.title}</CardTitle>
              <CardDescription>
                {update.className} • {update.teacherName}
              </CardDescription>
            </div>
            <Badge className="bg-primary/10">Posted {format(update.createdAt, "MMM d, yyyy 'at' h:mm a")}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="whitespace-pre-line">{update.content}</div>

            {update.attachments.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Attachments:</h3>
                <ul className="space-y-2">
                  {update.attachments.map((attachment, index) => (
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
    </div>
  )
}
