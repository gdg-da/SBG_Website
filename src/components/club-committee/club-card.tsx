"use client"

import { ExternalLink } from "lucide-react"

interface Club {
    name: string;
    description: string;
}

interface ClubCardProps {
    club: Club;
}

export function ClubCard({ club }: ClubCardProps) {

    return (
        <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1 transition-all hover:scale-105 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-theme-red/10 to-theme-yellow/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-theme-red opacity-5 transition-transform group-hover:scale-150" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-theme-yellow opacity-5 transition-transform group-hover:scale-150" />
            <div className="relative space-y-4 p-5">
                <div className="flex items-start justify-between">
                    <div className="flex-1"><h3 className="text-xl font-bold group-hover:text-theme-red transition-colors">{club.name}</h3></div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{club.description}</p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all duration-300 group-hover:w-full" />
            </div>
        </div>
    )
}