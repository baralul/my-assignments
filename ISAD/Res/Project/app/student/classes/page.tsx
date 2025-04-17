"use client"
import Link from "next/link"
import { Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ClassesPage() {
  // Mock classes data - a student would see their enrolled classes
  const classes = [
    {
      id: "1",
      name: "Introduction to Computer Science",
      description: "A comprehensive introduction to the fundamentals of computer science.",
      teacherName: "Dr. Smith",
      students: 32,
      code: "CS101-XYZ",
      joinDate: "2025-01-15",
    },
    {
      id: "2",
      name: "Advanced Mathematics",
      description: "Advanced topics in mathematics including calculus and linear algebra.",
      teacherName: "Prof. Johnson",
      students: 18,
      code: "MATH202-ABC",
      joinDate: "2025-01-16",
    },
    {
      id: "3",
      name: "Physics 101",
      description: "An introduction to the principles of physics.",
      teacherName: "Dr. Williams",
      students: 25,
      code: "PHYS101-DEF",
      joinDate: "2025-01-18",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Classes</h1>
        <Link href="/student/classes/join">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Join Class
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <Card key={cls.id}>
            <CardHeader>
              <CardTitle>{cls.name}</CardTitle>
              <CardDescription>{cls.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Teacher:</span>
                  <span className="text-sm">{cls.teacherName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Joined:</span>
                  <span className="text-sm">{cls.joinDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Students:</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{cls.students}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-1">
                <Badge variant="outline">Active</Badge>
              </div>
              <Link href={`/student/classes/${cls.id}`}>
                <Button>View Class</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
