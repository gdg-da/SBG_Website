import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Separator } from "@/components/ui/separator";
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "DAU SBG",
    description: "Official website og DAU SBG",
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
                        <Sidebar />
                        <main className="overflow-y-auto p-8">{children}</main>
                        <Footer />
                        <footer className="mt-8 w-full">
                            <div className="flex justify-center items-center">
                                <Separator className="bg-white w-[90vw]" />
                            </div>
                            <div className="flex w-full justify-center items-center space-x-2 text-sm text-gray-500 py-6">
                                <div>&copy; {new Date().getFullYear()} SBG DAU</div>
                                <Separator className="bg-white h-5" orientation="vertical" />
                                <div>All rights reserved</div>
                                <Separator className="bg-white h-5" orientation="vertical" />
                                <div>
                                    <a
                                        href="https://github.com/ossdaiict/SBG_Website"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#808080] hover:text-blue-500"
                                    >
                                        Developed by OSS GDG DAIICT
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}