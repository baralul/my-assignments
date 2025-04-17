"use client"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Archive, Check, Eye, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { toast } from "sonner"

export default function NotificationsPage() {
  const router = useRouter()

  // Mock notifications data (student comments)
  const [activeNotifications, setActiveNotifications] = useState([
    {
      id: "1",
      type: "comment",
      studentId: "2",
      studentName: "Jane Smith",
      avatar: "",
      content: "Is it okay to use a different programming language than what was discussed in class?",
      timestamp: new Date(2025, 3, 15, 14, 45), // April 15, 2025, 2:45 PM
      assignmentId: "1",
      assignmentTitle: "Programming Assignment #3",
      className: "Introduction to Computer Science",
      read: false,
    },
    {
      id: "2",
      type: "comment",
      studentId: "3",
      studentName: "Bob Johnson",
      avatar: "",
      content: "I'm having trouble with problem 3 in the latest problem set. Could you provide some clarification?",
      timestamp: new Date(2025, 3, 16, 9, 30), // April 16, 2025, 9:30 AM
      assignmentId: "2",
      assignmentTitle: "Problem Set 5",
      className: "Advanced Mathematics",
      read: false,
    },
    {
      id: "3",
      type: "comment",
      studentId: "4",
      studentName: "Alice Williams",
      avatar: "",
      content: "I've submitted my assignment. Please let me know if you need any clarification.",
      timestamp: new Date(2025, 3, 14, 16, 20), // April 14, 2025, 4:20 PM
      assignmentId: "1",
      assignmentTitle: "Programming Assignment #3",
      className: "Introduction to Computer Science",
      read: true,
    },
    {
      id: "4",
      type: "comment",
      studentId: "5",
      studentName: "Charlie Brown",
      avatar: "",
      content: "When will we receive feedback on our lab reports?",
      timestamp: new Date(2025, 3, 13, 11, 45), // April 13, 2025, 11:45 AM
      assignmentId: "3",
      assignmentTitle: "Lab Report",
      className: "Physics 101",
      read: true,
    },
  ])

  const markAsRead = (id: string) => {
    setActiveNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )

    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  const markAsUnread = (id: string) => {
    setActiveNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: false } : notification)),
    )

    toast({
      title: "Notification marked as unread",
      description: "The notification has been marked as unread.",
    })
  }

  const archiveNotification = (id: string) => {
    setActiveNotifications((prev) => prev.filter((notification) => notification.id !== id))

    toast({
      title: "Notification archived",
      description: "The notification has been moved to the archive.",
    })
  }

  // Sort notifications by timestamp (newest first)
  const sortedNotifications = [...activeNotifications].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notification Center</h1>
        <p className="text-muted-foreground">Student comments on assignments and updates</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Comments</CardTitle>
          <CardDescription>
            {activeNotifications.filter((n) => !n.read).length} unread comment
            {activeNotifications.filter((n) => !n.read).length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedNotifications.map((notification) => (
              <div key={notification.id} className={`rounded-lg border p-4 ${notification.read ? "" : "bg-muted/50"}`}>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{notification.studentName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{notification.studentName}</h3>
                        {!notification.read && <Badge className="bg-blue-500">New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(notification.timestamp, "EEE, dd MMM yyyy, HH:mm")}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {notification.className} • {notification.assignmentTitle}
                    </p>
                    <p className="mt-2">{notification.content}</p>
                    <div className="mt-4 flex justify-end gap-2">
                      {!notification.read ? (
                        <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                          <Check className="mr-2 h-4 w-4" />
                          Mark as Read
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => markAsUnread(notification.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Mark as Unread
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => archiveNotification(notification.id)}>
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </Button>
                      <Button
                        onClick={() => router.push(`/teacher/assignments/${notification.assignmentId}`)}
                        className="flex items-center gap-1"
                      >
                        <MessageSquare className="h-4 w-4" />
                        View and Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
