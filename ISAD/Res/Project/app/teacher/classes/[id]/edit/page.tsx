"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Slider } from "@/components/ui/slider"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Class name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  studentLimit: z.number().min(1).max(256),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
})

export default function EditClassPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isPremium, setIsPremium] = useState(false) // In a real app, this would come from user data

  const maxStudents = isPremium ? 256 : 32

  // Mock class data
  const classData = {
    id: params.id,
    name:
      params.id === "1"
        ? "Introduction to Computer Science"
        : params.id === "2"
          ? "Advanced Mathematics"
          : "Physics 101",
    description: "A comprehensive introduction to the fundamentals of computer science.",
    studentLimit: params.id === "1" ? 32 : params.id === "2" ? 18 : 25,
    password: "cs101",
    code: params.id === "1" ? "CS101-XYZ" : params.id === "2" ? "MATH202-ABC" : "PHYS101-DEF",
    students: params.id === "1" ? 32 : params.id === "2" ? 18 : 25,
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: classData.name,
      description: classData.description,
      studentLimit: classData.studentLimit,
      password: classData.password,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Class successfully edited",
        description: `${values.name} has been updated successfully.`,
      })
      router.push(`/teacher/classes/${params.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the class.",
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
        Back to Class
      </Button>

      <div>
        <h1 className="text-3xl font-bold">Edit Class</h1>
        <p className="text-muted-foreground">Update the details of your class.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This is the name that will be displayed to students.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                <FormDescription>
                  Provide a brief description of what students will learn in this class.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Students</FormLabel>
                <div className="space-y-2">
                  <FormControl>
                    <Slider
                      min={classData.students}
                      max={maxStudents}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <div className="flex justify-between">
                    <FormDescription>
                      Current students: {classData.students} {isPremium ? "" : "(Free limit: 32)"}
                    </FormDescription>
                    <span className="text-sm">{field.value} students</span>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Password</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription>Students will need this password to join your class.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
