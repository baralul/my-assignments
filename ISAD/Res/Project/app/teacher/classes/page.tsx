"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Plus, Copy, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function ClassesPage() {
  const { toast } = useToast()
  const [isCodeCopied, setIsCodeCopied] = useState(false)
  const router = useRouter()

  // Mock classes data
  const [classes, setClasses] = useState([
    {
      id: "1",
      name: "Introduction to Computer Science",
      description: "A comprehensive introduction to the fundamentals of computer science.",
      password: "cs101",
      code: "CS101-XYZ",
      students: 32,
    },
    {
      id: "2",
      name: "Advanced Mathematics",
      description: "Advanced topics in mathematics including calculus and linear algebra.",
      password: "math202",
      code: "MATH202-ABC",
      students: 18,
    },
    {
      id: "3",
      name: "Physics 101",
      description: "An introduction to the principles of physics.",
      password: "phys101",
      code: "PHYS101-DEF",
      students: 25,
    },
  ])

  const handleEditClass = (classItem: any) => {
    router.push(`/teacher/classes/${classItem.id}/edit`)
  }

  const copyClassCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setIsCodeCopied(true)

    toast({
      title: "Class code copied",
      description: "The class code has been copied to your clipboard.",
    })

    setTimeout(() => setIsCodeCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Classes</h1>
        <Link href="/teacher/classes/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Class
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
                  <span className="text-sm font-medium">Class Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{cls.code}</span>
                    <Button variant="ghost" size="icon" onClick={() => copyClassCode(cls.code)} className="h-6 w-6">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Password:</span>
                  <span className="text-sm">••••••••</span>
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
              <Button variant="outline" onClick={() => handleEditClass(cls)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Link href={`/teacher/classes/${cls.id}`}>
                <Button>View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

