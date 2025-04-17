import Link from "next/link"
import { format, differenceInDays } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface AssignmentCardProps {
  assignment: {
    id: string
    title: string
    className: string
    dueDate: Date
    status?: "submitted" | "late" | "not-submitted"
    submittedAt?: Date
  }
  role: "teacher" | "student"
}

export function AssignmentCard({ assignment, role }: AssignmentCardProps) {
  const daysUntilDue = differenceInDays(assignment.dueDate, new Date())

  const getStatusColor = () => {
    if (daysUntilDue < 0) return "text-gray-500" // Overdue
    if (daysUntilDue === 0) return "text-red-500" // Due today
    if (daysUntilDue <= 3) return "text-yellow-500" // Due soon
    return "text-green-500" // Due later
  }

  const getStatusText = () => {
    if (daysUntilDue < 0) return "Overdue"
    if (daysUntilDue === 0) return "Due today"
    if (daysUntilDue === 1) return "Due tomorrow"
    return `Due in ${daysUntilDue} days`
  }

  const getSubmissionStatusBadge = () => {
    if (!assignment.status) return null

    switch (assignment.status) {
      case "submitted":
        return <Badge className="bg-green-500">Submitted</Badge>
      case "late":
        return <Badge className="bg-red-500">Late</Badge>
      case "not-submitted":
        return <Badge variant="outline">Not Submitted</Badge>
      default:
        return null
    }
  }

  const getSubmissionTimeText = () => {
    if (!assignment.submittedAt) return null

    const diffInHours = Math.round((assignment.submittedAt.getTime() - assignment.dueDate.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 0) {
      const hours = Math.abs(diffInHours)
      if (hours < 24) {
        return <span className="text-green-500">Submitted {hours} hours early</span>
      } else {
        const days = Math.floor(hours / 24)
        return <span className="text-green-500">Submitted {days} days early</span>
      }
    } else {
      if (diffInHours < 24) {
        return <span className="text-red-500">Submitted {diffInHours} hours late</span>
      } else {
        const days = Math.floor(diffInHours / 24)
        return <span className="text-red-500">Submitted {days} days late</span>
      }
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">{assignment.title}</h3>
              <p className="text-sm text-muted-foreground">{assignment.className}</p>
            </div>
            {role === "student" && getSubmissionStatusBadge()}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span>Due: {format(assignment.dueDate, "MMM d, yyyy 'at' h:mm a")}</span>
            </div>
            <div className={`text-sm font-medium ${getStatusColor()}`}>{getStatusText()}</div>
          </div>
          {role === "student" && assignment.submittedAt && <div className="text-sm">{getSubmissionTimeText()}</div>}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link
          href={`/${role}/${role === "teacher" ? "assignments" : "assignments"}/${assignment.id}`}
          className="w-full"
        >
          <Button variant="outline" className="w-full">
            {role === "teacher" ? "View Submissions" : "View Assignment"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
