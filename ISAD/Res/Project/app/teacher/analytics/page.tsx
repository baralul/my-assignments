"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AnalyticsPage() {
  const [selectedClass, setSelectedClass] = useState<string>("all")

  // Mock classes data
  const classes = [
    { id: "1", name: "Introduction to Computer Science" },
    { id: "2", name: "Advanced Mathematics" },
    { id: "3", name: "Physics 101" },
  ]

  // Mock assignment data
  const assignmentStats = [
    {
      id: "1",
      title: "Programming Assignment #3",
      classId: "1",
      class: "Introduction to Computer Science",
      onTime: 25,
      late: 5,
      notSubmitted: 2,
      totalStudents: 32,
    },
    {
      id: "2",
      title: "Problem Set 5",
      classId: "2",
      class: "Advanced Mathematics",
      onTime: 15,
      late: 2,
      notSubmitted: 1,
      totalStudents: 18,
    },
    {
      id: "3",
      title: "Lab Report",
      classId: "3",
      class: "Physics 101",
      onTime: 20,
      late: 3,
      notSubmitted: 2,
      totalStudents: 25,
    },
  ]

  // Filter assignments by selected class
  const filteredAssignments =
    selectedClass === "all"
      ? assignmentStats
      : assignmentStats.filter((assignment) => assignment.classId === selectedClass)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
      </div>

      <Card className="border-2 border-dashed border-yellow-300">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 flex items-center gap-2">
            <Badge className="bg-yellow-500 text-white">
              <Crown className="mr-1 h-3 w-3" />
              Premium Feature
            </Badge>
          </div>
          <h2 className="text-2xl font-bold">Analytics is under construction</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            This will be a premium feature in the future. Analytics will provide insights into student performance,
            assignment completion rates, and more.
          </p>
          <Button className="mt-6" variant="outline">
            Learn More About Premium
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
