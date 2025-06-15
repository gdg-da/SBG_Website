import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Separator } from "@/components/ui/separator";
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "DAU SBG",
    description: "Official website of DAU SBG",
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-big-calendar@0.38.0/lib/css/react-big-calendar.css" />
            </head>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <div className="h-screen bg-background">
                        <SiteHeader />
                        <main className="overflow-y-auto">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}