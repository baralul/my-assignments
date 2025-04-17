"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { HelpCircle, Mail, MessageSquare, Phone, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function SupportPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      category: "",
      message: "",
    },
  })

  // Mock FAQ data
  const faqs = [
    {
      question: "How do I create a class?",
      answer:
        "To create a class, navigate to the Classes section from your dashboard and click on the 'Create Class' button. Fill in the required information such as class name, description, and access password. Once created, you'll receive a unique class code and join link that you can share with your students.",
    },
    {
      question: "How do students join my class?",
      answer:
        "Students can join your class in two ways: by entering the class code or by using the join link. Both methods will require the student to enter the access password you set when creating the class. You can find and regenerate both the class code and join link from the class settings page.",
    },
    {
      question: "How do I create an assignment?",
      answer:
        "To create an assignment, go to the Assignments section and click on 'Create Assignment'. Fill in the details including title, instructions, due date, and submission type. You can also attach files as reference materials or rubrics. Once published, the assignment will be visible to all students enrolled in the selected class.",
    },
    {
      question: "How do I track student submissions?",
      answer:
        "You can track student submissions by going to the specific assignment page. There, you'll see a list of all students in the class with their submission status (on time, late, or not submitted). Clicking on a student's name will show you their submission details, where you can review their work and provide feedback.",
    },
    {
      question: "What are the premium features?",
      answer:
        "Premium features include priority access to support and increased file upload size (from 10 MB to 100 MB). This allows you to share larger files with your students, such as video lectures or comprehensive study materials.",
    },
    {
      question: "How do I export analytics data?",
      answer:
        "To export analytics data, navigate to the Analytics section of your dashboard. Use the filter options to select the data you want to analyze, then click on either 'Export as CSV' or 'Export as PDF' buttons at the top right of the page. The exported file will contain all the data currently displayed in your analytics view.",
    },
  ]

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Support ticket submitted",
        description: "We'll get back to you via email as soon as possible.",
      })

      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your support ticket.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support Center</h1>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="faq">Help Center</TabsTrigger>
          <TabsTrigger value="ticket">Contact Support</TabsTrigger>
        </TabsList>
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about using the platform.</CardDescription>
              <div className="relative mt-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-start gap-2">
                        <HelpCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{faq.question}</h3>
                          <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Try a different search term or contact support
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t p-6">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a href="mailto:support@siap.edu" className="text-sm hover:underline">
                    support@siap.edu
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Live chat: 9AM-5PM EST</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="ticket">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Submit a support ticket and we'll get back to you via email.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of your issue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="account">Account Issues</SelectItem>
                            <SelectItem value="classes">Class Management</SelectItem>
                            <SelectItem value="assignments">Assignments</SelectItem>
                            <SelectItem value="billing">Billing & Premium</SelectItem>
                            <SelectItem value="technical">Technical Issues</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your issue in detail..." {...field} rows={6} />
                        </FormControl>
                        <FormDescription>
                          Please provide as much detail as possible to help us assist you better.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Ticket"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t p-6">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a href="mailto:support@siap.edu" className="text-sm hover:underline">
                    support@siap.edu
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Live chat: 9AM-5PM EST</span>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-yellow-50">
                  Premium
                </Badge>
                <span className="text-sm">
                  Premium users receive priority support with 24-hour response time guarantee
                </span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
