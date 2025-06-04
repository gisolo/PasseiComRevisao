"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function Navigation() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-brand-primary" />
          <span className="text-xl font-bold text-brand-primary">PasseiComRevisão</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/study">
            <Button variant="ghost">Ferramenta de Estudo</Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
