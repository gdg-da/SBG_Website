import sbgData from "@/data/sbg.json";
import { Mail } from "lucide-react";

export default function SBGPage() {
    return (
        <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-theme-black">
            <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] rounded-full bg-theme-yellow opacity-20 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 -z-10 h-[200px] w-[200px] rounded-full bg-theme-red opacity-20 blur-[100px]"></div>
            </div>

            <div className="container relative z-10 px-4 py-16 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
                {/* <div className="inline-flex items-center rounded-full border border-theme-gray-light bg-theme-gray-light/30 px-3 py-1 text-sm backdrop-blur-sm">
                <Icon className="h-8 w-8 text-theme-yellow" />
                </div> */}
                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-theme-yellow to-theme-red bg-clip-text text-transparent">
                    Student Body Government (SBG)
                </span>
                </h1>
                <p className="mt-4 text-xl text-muted-foreground">
                    {sbgData.description}
                </p>
            </div>
            </div>

        </section >

        <section className="container px-4 py-12 md:px-6">
            <div className="mx-auto max-w-7xl">
            {sbgData.members.map((yearGroup, index) => (
                <div className="relative mb-6 overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1">
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-theme-black/80 via-theme-black/70 to-transparent" />
                    <div className="relative flex justify-between items-center p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-start space-y-4">
                                <div className="space-y-2">
                                <h2 className="text-xl font-bold">{yearGroup.representatives.name}</h2>
                                <p className="text-muted-foreground">{yearGroup.position}</p>
                                </div>
                            </div>
                        </div>

                        <div className="group w-fit p-4 relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray transition-all hover:scale-105 hover:shadow-lg">
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-theme-red/10 to-theme-yellow/5 opacity-0 transition-opacity group-hover:opacity-100" />

                            {/* Animated background elements */}
                            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-theme-red opacity-5 transition-transform group-hover:scale-150" />
                            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-theme-yellow opacity-5 transition-transform group-hover:scale-150" />
                        
                            <div className="relative flex justify-center items-center gap-4">
                                <div className="inline-flex items-center rounded-full border border-theme-gray-light bg-theme-gray-light/30 text-sm backdrop-blur-sm">
                                    <Mail className="text-theme-yellow" />
                                </div>
                                <p><strong> {yearGroup.representatives.email} </strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </section>
        </div>
    )
}