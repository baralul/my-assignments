import Link from "next/link"

export function SharedHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="font-bold text-xl flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M17 11V3H7v8H3v10h18V11h-4Z" />
            <path d="M10 7V3" />
            <path d="M14 7V3" />
          </svg>
          SIAP
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="px-4 py-2 rounded-md hover:bg-muted">Login</button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Register</button>
          </Link>
        </div>
      </div>
    </header>
  )
}
