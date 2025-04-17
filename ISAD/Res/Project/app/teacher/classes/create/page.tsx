"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Slider } from "@/components/ui/slider"
import { Copy } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Class name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  studentLimit: z.number().min(1).max(32),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
})

export default function CreateClassPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isPremium, setIsPremium] = useState(false) // In a real app, this would come from user data

  const maxStudents = isPremium ? 256 : 32

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      studentLimit: maxStudents,
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a mock class code
      const classCode = `${values.name.substring(0, 3).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`

      toast({
        title: "Class successfully created",
        description: (
          <div className="flex flex-col gap-2">
            <p>{values.name} has been created successfully.</p>
            <div className="flex items-center gap-2 bg-muted p-2 rounded">
              <span className="font-medium">Class Code: {classCode}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  navigator.clipboard.writeText(classCode)
                  toast({
                    title: "Copied",
                    description: "Class code copied to clipboard",
                  })
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ),
      })
      router.push("/teacher/classes")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating the class.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Class</h1>
        <p className="text-muted-foreground">Fill in the details to create a new class for your students.</p>
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
                  <Input placeholder="Introduction to Computer Science" {...field} />
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
                  <Textarea
                    placeholder="A comprehensive introduction to the fundamentals of computer science..."
                    {...field}
                    rows={4}
                  />
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
                      min={1}
                      max={maxStudents}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <div className="flex justify-between">
                    <FormDescription>
                      Maximum students: {field.value} {isPremium ? "" : "(Free limit: 32)"}
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
                  <Input type="password" {...field} />
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
              {isLoading ? "Creating..." : "Create Class"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
