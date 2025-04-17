"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, CalendarIcon, Upload } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  instructions: z.string().min(10, {
    message: "Instructions must be at least 10 characters.",
  }),
  classId: z.string({
    required_error: "Please select a class.",
  }),
  dueDate: z.date({
    required_error: "Please select a due date.",
  }),
  dueTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in 24-hour format (HH:MM).",
  }),
  submissionType: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one submission type.",
  }),
  allowComments: z.boolean().default(true),
})

export default function EditAssignmentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  // Mock classes data
  const classes = [
    { id: "1", name: "Introduction to Computer Science" },
    { id: "2", name: "Advanced Mathematics" },
    { id: "3", name: "Physics 101" },
  ]

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
    classId: params.id === "1" || params.id === "4" ? "1" : params.id === "2" || params.id === "5" ? "2" : "3",
    dueDate: new Date(2025, 3, 20, 23, 59), // April 20, 2025, 11:59 PM
    dueTime: "23:59",
    instructions:
      "In this assignment, you will implement a simple data structure and algorithm to solve a real-world problem. You will need to write code that efficiently processes a large dataset and produces the correct output according to the specifications below.\n\nRequirements:\n1. Implement a binary search tree data structure\n2. Write functions to insert, delete, and search for elements\n3. Implement a traversal algorithm to print all elements in order\n4. Write a function to find the height of the tree\n5. Include proper error handling and edge cases\n\nYour submission should include well-documented code with comments explaining your approach and any design decisions you made.\n\nGood luck!",
    submissionType: ["file", "text"],
    allowComments: true,
    attachments: [
      { name: "assignment_spec.pdf", url: "#" },
      { name: "starter_code.zip", url: "#" },
    ],
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: assignment.title,
      instructions: assignment.instructions,
      classId: assignment.classId,
      dueDate: assignment.dueDate,
      dueTime: assignment.dueTime,
      submissionType: assignment.submissionType,
      allowComments: assignment.allowComments,
    },
  })

  const submissionTypes = [
    { id: "file", label: "File Upload" },
    { id: "text", label: "Text Entry" },
  ]

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Assignment successfully edited",
        description: `${values.title} has been updated successfully.`,
      })
      router.push(`/teacher/assignments/${params.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the assignment.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Assignment
      </Button>

      <div>
        <h1 className="text-3xl font-bold">Edit Assignment</h1>
        <p className="text-muted-foreground">Update the details of your assignment.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignment Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="classId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={6} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="submissionType"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Submission Type</FormLabel>
                  <FormDescription>Select the type(s) of submission allowed for this assignment.</FormDescription>
                </div>
                {submissionTypes.map((type) => (
                  <FormField
                    key={type.id}
                    control={form.control}
                    name="submissionType"
                    render={({ field }) => {
                      return (
                        <FormItem key={type.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(type.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, type.id])
                                  : field.onChange(field.value?.filter((value) => value !== type.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{type.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowComments"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Allow Comments</FormLabel>
                  <FormDescription>Enable students to comment on this assignment.</FormDescription>
                </div>
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Current Attachments</h3>
              <ul className="mt-2 space-y-2">
                {assignment.attachments.map((attachment, index) => (
                  <li key={index} className="flex items-center justify-between rounded-md border p-2">
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm">{attachment.name}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Add New Attachments</h3>
              <p className="text-sm text-muted-foreground">
                Upload any additional reference materials or rubrics for this assignment.
              </p>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="attachment">Upload Files</Label>
              <div className="flex items-center gap-2">
                <Input id="attachment" type="file" multiple onChange={handleFileChange} />
              </div>
            </div>
            {files.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">New Files:</h4>
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
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
