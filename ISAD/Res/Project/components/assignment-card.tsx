import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SharedHeader } from "@/components/shared-header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SharedHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  SIAP: Academic Collaboration Made Simple
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A platform for teachers and students to manage classes, assignments, and academic communication.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register?role=teacher">
                  <Button size="lg">Register as Teacher</Button>
                </Link>
                <Link href="/register?role=student">
                  <Button size="lg" variant="outline">
                    Register as Student
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Class Management</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create and join classes with secure access codes and links.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Assignment Tracking</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create, submit, and track assignments with visual due date indicators.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Academic Updates</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Share and receive important class announcements and information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 SIAP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
