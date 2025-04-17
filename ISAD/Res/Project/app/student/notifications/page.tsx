"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Archive, Bell, Check, Clock, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function NotificationsPage() {
  const { toast } = useToast()
  const [activeNotifications, setActiveNotifications] = useState<any[]>([
    {
      id: "1",
      type: "assignment",
      title: "New Assignment: Programming Assignment #3",
      class: "Introduction to Computer Science",
      date: new Date(2025, 3, 15, 10, 30), // April 15, 2025, 10:30 AM
      content: "A new assignment has been posted to your class. Due date: April 20, 2025.",
      read: false,
    },
    {
      id: "2",
      type: "update",
      title: "Class Update: Midterm Exam Information",
      class: "Advanced Mathematics",
      date: new Date(2025, 3, 16, 14, 45), // April 16, 2025, 2:45 PM
      content: "Important information about the upcoming midterm exam has been posted.",
      read: false,
    },
    {
      id: "3",
      type: "reminder",
      title: "Assignment Due Soon: Problem Set 5",
      class: "Advanced Mathematics",
      date: new Date(2025, 3, 17, 9, 0), // April 17, 2025, 9:00 AM
      content: "Your assignment is due in less than 24 hours.",
      read: true,
    },
  ])

  const [archivedNotifications, setArchivedNotifications] = useState<any[]>([
    {
      id: "4",
      type: "assignment",
      title: "New Assignment: Lab Report",
      class: "Physics 101",
      date: new Date(2025, 3, 10, 11, 15), // April 10, 2025, 11:15 AM
      content: "A new assignment has been posted to your class. Due date: April 25, 2025.",
      read: true,
    },
    {
      id: "5",
      type: "update",
      title: "Class Update: Reading Materials",
      class: "Introduction to Computer Science",
      date: new Date(2025, 3, 8, 16, 30), // April 8, 2025, 4:30 PM
      content: "New reading materials have been posted for next week's lecture.",
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
    const notification = activeNotifications.find((n) => n.id === id)
    if (notification) {
      setActiveNotifications((prev) => prev.filter((n) => n.id !== id))
      setArchivedNotifications((prev) => [{ ...notification, read: true }, ...prev])

      toast({
        title: "Notification archived",
        description: "The notification has been moved to the archive.",
      })
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <Bell className="h-5 w-5 text-blue-500" />
      case "update":
        return <Bell className="h-5 w-5 text-green-500" />
      case "reminder":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="active">
            Active
            {activeNotifications.filter((n) => !n.read).length > 0 && (
              <Badge className="ml-2 bg-red-500">{activeNotifications.filter((n) => !n.read).length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Notifications</CardTitle>
              <CardDescription>Recent notifications from your classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeNotifications.length > 0 ? (
                  activeNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-lg border p-4 ${notification.read ? "" : "bg-muted/50"}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            {!notification.read && <Badge className="bg-blue-500">New</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.class}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(notification.date, "MMM d, yyyy 'at' h:mm a")}
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
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">No active notifications</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="archived">
          <Card>
            <CardHeader>
              <CardTitle>Archived Notifications</CardTitle>
              <CardDescription>Notifications you've archived</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {archivedNotifications.length > 0 ? (
                  archivedNotifications.map((notification) => (
                    <div key={notification.id} className="rounded-lg border p-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.class}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(notification.date, "MMM d, yyyy 'at' h:mm a")}
                          </p>
                          <p className="mt-2">{notification.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">No archived notifications</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
