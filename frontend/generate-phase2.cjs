const fs = require('fs');
const path = require('path');

const root = 'C:/Users/Bayzid/portfolio';

const dirs = [
  'src/lib',
  'src/data',
  'src/components/ui',
  'src/components/shared',
  'src/components/layout',
  'src/components/providers',
];

dirs.forEach((d) => fs.mkdirSync(path.join(root, d), { recursive: true }));

const files = {
  'src/lib/utils.ts': `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,

  'src/components/ui/button.tsx': `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"
`,

  'src/components/ui/card.tsx': `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
`,

  'src/components/ui/badge.tsx': `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
export { Badge, badgeVariants }
`,

  'src/components/layout/MaxWidthWrapper.tsx': `import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl px-4 md:px-8", className)}>
      {children}
    </div>
  )
}
`,

  'src/components/layout/SectionContainer.tsx': `import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export function SectionContainer({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      {children}
    </section>
  )
}
`,

  'src/components/shared/SectionHeading.tsx': `import { cn } from "@/lib/utils"

export function SectionHeading({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={cn("mb-12 flex flex-col items-start gap-4", className)}>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </div>
  )
}
`,

  'src/components/shared/GlassCard.tsx': `import { cn } from "@/lib/utils"
import { ReactNode, HTMLAttributes } from "react"

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function GlassCard({ className, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 shadow-xl dark:border-white/10 dark:bg-black/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
`,

  'src/components/shared/SocialIcon.tsx': `import { LucideIcon } from "lucide-react"

export function SocialIcon({
  icon: Icon,
  href,
  label,
}: {
  icon: LucideIcon
  href: string
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
    >
      <Icon className="h-5 w-5" />
    </a>
  )
}
`,

  'src/components/shared/Loading.tsx': `import { Loader2 } from "lucide-react"

export function Loading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4 text-muted-foreground">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="animate-pulse">{message}</p>
    </div>
  )
}
`,

  'src/components/providers/ThemeProvider.tsx': `import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
`,

  'src/components/shared/ThemeToggle.tsx': `import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/providers/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
`,

  'src/data/config.ts': `export const siteConfig = {
  author: "Bayzid",
  title: "Premium Portfolio",
  description: "A world-class digital identity showcasing engineering, research, and design.",
  url: "https://portfolio.local",
  navLinks: [
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Research", href: "#research" },
    { label: "Photography", href: "#photography" },
  ],
  socials: [
    { platform: "GitHub", href: "https://github.com", icon: "github" },
    { platform: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { platform: "Twitter", href: "https://twitter.com", icon: "twitter" },
    { platform: "Email", href: "mailto:hello@example.com", icon: "email" },
  ]
}
`,

  'src/data/projects.ts': `export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [];
`,

  'src/data/experience.ts': `export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export const experiences: Experience[] = [];
`,

  'src/data/research.ts': `export interface ResearchItem {
  id: string;
  title: string;
  conference: string;
  year: string;
  link?: string;
  abstract: string;
}

export const research: ResearchItem[] = [];
`,

  'src/data/certificates.ts': `export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export const certificates: Certificate[] = [];
`,

  'src/data/photography.ts': `export interface Photo {
  id: string;
  src: string;
  alt: string;
  location?: string;
  date?: string;
}

export const photos: Photo[] = [];
`,

  'src/components/layout/Navbar.tsx': `import { useState, useEffect } from "react"
import { siteConfig } from "@/data/config"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { MaxWidthWrapper } from "./MaxWidthWrapper"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-background/80 backdrop-blur-md border-border shadow-sm" : "bg-transparent"
      )}
    >
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <div className="font-bold text-xl tracking-tighter">
            {siteConfig.author.split(" ")[0]}<span className="text-primary">.</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {siteConfig.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  )
}
`,

  'src/components/layout/Footer.tsx': `import { MaxWidthWrapper } from "./MaxWidthWrapper"
import { siteConfig } from "@/data/config"
import { SocialIcon } from "@/components/shared/SocialIcon"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

const iconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  email: Mail,
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12 md:py-16">
      <MaxWidthWrapper>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-xl">{siteConfig.author}</span>
            <p className="text-muted-foreground text-sm max-w-sm text-center md:text-left">
              {siteConfig.description}
            </p>
          </div>
          <div className="flex gap-4">
            {siteConfig.socials.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap]
              return <SocialIcon key={social.platform} href={social.href} label={social.platform} icon={Icon} />
            })}
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.author}. All rights reserved.
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
`,

  'src/components/layout/MainLayout.tsx': `import { ReactNode } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
`,
};

Object.entries(files).forEach(([file, content]) => {
  fs.writeFileSync(path.join(root, file), content);
});

console.log('Phase 2 scaffolding generated successfully.');
