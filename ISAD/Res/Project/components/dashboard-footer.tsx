import Link from "next/link"
import { Mail, MessageSquare, Phone } from "lucide-react"

export function DashboardFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 SIAP. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href="mailto:support@siap.edu" className="text-sm hover:underline">
              support@siap.edu
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <Link href="/teacher/support" className="text-sm hover:underline">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
