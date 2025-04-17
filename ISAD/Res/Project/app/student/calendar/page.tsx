"use client"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function CalendarPage() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Mock assignments data
  const assignments = [
    {
      id: "1",
      title: "Programming Assignment #3",
      dueDate: new Date(2025, 3, 20), // April 20, 2025
      class: "Introduction to Computer Science",
      status: "pending",
    },
    {
      id: "2",
      title: "Problem Set 5",
      dueDate: new Date(2025, 3, 18), // April 18, 2025
      class: "Advanced Mathematics",
      status: "pending",
    },
    {
      id: "3",
      title: "Lab Report",
      dueDate: new Date(2025, 3, 25), // April 25, 2025
      class: "Physics 101",
      status: "pending",
    },
    {
      id: "4",
      title: "Midterm Exam",
      dueDate: new Date(2025, 3, 15), // April 15, 2025
      class: "Introduction to Computer Science",
      status: "completed",
    },
  ]

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getAssignmentsForDay = (day: Date) => {
    return assignments.filter((assignment) => isSameDay(assignment.dueDate, day))
  }

  const getDayColor = (day: Date) => {
    const today = new Date()
    const dayAssignments = getAssignmentsForDay(day)

    if (!isSameMonth(day, currentMonth)) {
      return "text-gray-300"
    }

    if (isSameDay(day, today)) {
      return "bg-blue-100 text-blue-600 font-bold"
    }

    if (dayAssignments.length > 0) {
      const daysUntilDue = Math.floor((day.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

      if (daysUntilDue < 0) {
        return "bg-gray-100" // Overdue
      } else if (daysUntilDue < 1) {
        return "bg-red-100" // Due in less than 24 hours
      } else if (daysUntilDue <= 3) {
        return "bg-yellow-100" // Due in 1-3 days
      } else {
        return "bg-green-50" // Due in more than 3 days
      }
    }

    return ""
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Assignment Calendar</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
            <CardDescription>View your assignments by due date</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 font-medium">
                {day}
              </div>
            ))}

            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-start-${index}`} className="p-2"></div>
            ))}

            {days.map((day) => {
              const dayAssignments = getAssignmentsForDay(day)
              return (
                <div
                  key={day.toString()}
                  className={cn(
                    "min-h-[100px] rounded-md border p-2 hover:bg-muted/50 cursor-pointer",
                    getDayColor(day),
                  )}
                  onClick={() => {
                    if (dayAssignments.length > 0) {
                      router.push(`/student/assignments?date=${format(day, "yyyy-MM-dd")}`)
                    }
                  }}
                >
                  <div className="font-medium">{format(day, "d")}</div>
                  <div className="mt-1 space-y-1">
                    {dayAssignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="truncate rounded-sm bg-primary/10 px-1 py-0.5 text-xs"
                        title={assignment.title}
                      >
                        {assignment.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
              <div key={`empty-end-${index}`} className="p-2"></div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-gray-100"></div>
          <span className="text-sm">Overdue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-100"></div>
          <span className="text-sm">Due in less than 24 hours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-100"></div>
          <span className="text-sm">Due in 1-3 days</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-50"></div>
          <span className="text-sm">Due in more than 3 days</span>
        </div>
      </div>
    </div>
  )
}
