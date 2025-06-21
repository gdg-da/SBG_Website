'use client';

import { Mail } from "lucide-react";
import { useSBG } from '@/lib/swr/sbg_swr';
import EditSBGButton from './EditSBGButton';

export default function SBGPage() {
    const { sbg, isLoading, isError } = useSBG();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                    <div className="h-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-32 bg-gray-200 rounded mb-4"></div>
                </div>
            </div>
        );
    }

    if (isError || !sbg) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">SBG Data Not Found</h1>
                    <p className="text-gray-600">Failed to load SBG information.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <section className="relative overflow-hidden bg-theme-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] rounded-full bg-theme-yellow opacity-20 blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 -z-10 h-[200px] w-[200px] rounded-full bg-theme-red opacity-20 blur-[100px]"></div>
                </div>
                <div className="container relative z-10 px-4 py-16 md:px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            <span className="bg-gradient-to-r from-theme-yellow to-theme-red bg-clip-text text-transparent">
                                Student Body Government (SBG)
                            </span>
                        </h1>
                        <p className="mt-4 text-xl text-muted-foreground">{sbg.description}</p>
                    </div>
                </div>
                <EditSBGButton />
            </section>
            <section className="container px-4 py-12 md:px-6">
                <div className="mx-auto max-w-7xl">
                    {sbg.members.map((member: any, index: number) => (
                        <div key={index} className="relative mb-6 overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1">
                            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-20" />
                            <div className="absolute inset-0 bg-gradient-to-br from-theme-black/80 via-theme-black/70 to-transparent" />
                            <div className="relative lg:flex lg:justify-between lg:items-center p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-start space-y-4">
                                        <div className="space-y-2">
                                            <h2 className="text-xl font-bold">{member.representatives.name}</h2>
                                            <p className="text-muted-foreground">{member.position}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="group w-fit max-sm:w-full max-sm:mt-8 max-sm:p-2 md:p-4 relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray transition-all hover:scale-105 hover:shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-br from-theme-red/10 to-theme-yellow/5 opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-theme-red opacity-5 transition-transform group-hover:scale-150" />
                                    <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-theme-yellow opacity-5 transition-transform group-hover:scale-150" />
                                    <div className="relative flex justify-center items-center gap-4 max-sm:flex-col max-sm:items-center">
                                        <div className="inline-flex items-center rounded-full border border-theme-gray-light bg-theme-gray-light/30 text-sm backdrop-blur-sm">
                                            <Mail className="text-theme-yellow" />
                                        </div>
                                        <p className="text-wrap">
                                            <strong>
                                                {member.representatives.email.split('@').map((part: string, index: number) => (
                                                    <span key={index} className="max-sm:block">
                                                        {part}
                                                        {index === 0 && <span className="max-sm:inline">@</span>}
                                                    </span>
                                                ))}
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}