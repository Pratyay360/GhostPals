"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  variant?: "outline" | "ghost" | "default"
  size?: "sm" | "default" | "lg" | "icon"
}

export function ThemeToggle({ 
  variant = "outline", 
  size = "icon" 
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const themes = ["light", "dark", "system"]

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme || "system")
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getThemeInfo = () => {
    switch (theme) {
      case "light":
        return { icon: <Sun className="h-[1.2rem] w-[1.2rem]" />, label: "Light theme" }
      case "dark":
        return { icon: <Moon className="h-[1.2rem] w-[1.2rem]" />, label: "Dark theme" }
      case "system":
        return { icon: <Monitor className="h-[1.2rem] w-[1.2rem]" />, label: "System theme" }
      default:
        return { icon: <Sun className="h-[1.2rem] w-[1.2rem]" />, label: "Light theme" }
    }
  }

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <Button variant={variant} size={size} disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    )
  }

  const themeInfo = getThemeInfo()


  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={toggleTheme}
      className="relative overflow-hidden transition-all duration-200 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`Current: ${themeInfo.label}. Click to cycle themes`}
    >
      <div className="relative flex items-center justify-center h-[1.2rem] w-[1.2rem]">
        <Sun className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out
          scale-100 rotate-0 opacity-100 
          dark:scale-0 dark:-rotate-90 dark:opacity-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out
          scale-0 rotate-90 opacity-0 
          dark:scale-100 dark:rotate-0 dark:opacity-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
