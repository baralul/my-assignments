"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const codeFormSchema = z.object({
  code: z.string().min(1, {
    message: "Class code is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

const linkFormSchema = z.object({
  link: z.string().url({
    message: "Please enter a valid URL.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

export default function JoinClassPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [className, setClassName] = useState<string | null>(null)
  const [step, setStep] = useState<"code" | "password">("code")
  const [error, setError] = useState<string | null>(null)

  const codeForm = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  })

  const linkForm = useForm<z.infer<typeof linkFormSchema>>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      link: "",
      password: "",
    },
  })

  async function verifyCode(code: string) {
    // In a real app, this would be an API call to verify the code
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For testing, always return valid with example class
    return {
      valid: true,
      className: "example",
    }
  }

  async function verifyLink(link: string) {
    // In a real app, this would be an API call to verify the link
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For testing, always return valid with example class
    return {
      valid: true,
      className: "example",
    }
  }

  async function joinClass(method: "code" | "link", values: any) {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For testing, always succeed regardless of password
      toast({
        title: "Success",
        description: `You have joined the example class.`,
      })
      router.push("/student/classes")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error joining the class.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onCodeSubmit(values: z.infer<typeof codeFormSchema>) {
    if (step === "code") {
      setIsLoading(true)
      try {
        const result = await verifyCode(values.code)
        if (result.valid) {
          setClassName(result.className)
          setStep("password")
          setError(null)
        } else {
          toast({
            title: "Invalid code",
            description: "The class code you entered is invalid.",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error verifying the class code.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      await joinClass("code", values)
    }
  }

  async function onLinkSubmit(values: z.infer<typeof linkFormSchema>) {
    if (step === "code") {
      setIsLoading(true)
      try {
        const result = await verifyLink(values.link)
        if (result.valid) {
          setClassName(result.className)
          setStep("password")
          setError(null)
        } else {
          toast({
            title: "Invalid link",
            description: "The class link you entered is invalid.",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error verifying the class link.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      await joinClass("link", values)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Join a Class</h1>
        <p className="text-muted-foreground">Enter a class code or link to join.</p>
      </div>

      {step === "code" ? (
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">Class Code</TabsTrigger>
            <TabsTrigger value="link">Join Link</TabsTrigger>
          </TabsList>
          <TabsContent value="code">
            <Form {...codeForm}>
              <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="space-y-4">
                <FormField
                  control={codeForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter class code" {...field} />
                      </FormControl>
                      <FormDescription>Enter the code provided by your teacher.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Next"}
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="link">
            <Form {...linkForm}>
              <form onSubmit={linkForm.handleSubmit(onLinkSubmit)} className="space-y-4">
                <FormField
                  control={linkForm.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Join Link</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/join/..." {...field} />
                      </FormControl>
                      <FormDescription>Enter the link provided by your teacher.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Next"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Class Information</h3>
            <p className="text-muted-foreground">{className}</p>
            <p className="text-xs text-muted-foreground mt-1">this is an example only</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...codeForm}>
            <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="space-y-4">
              <FormField
                control={codeForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter class password" {...field} />
                    </FormControl>
                    <FormDescription>Enter the password provided by your teacher.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep("code")} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Joining..." : "Join Class"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  )
}
