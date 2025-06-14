"use client"

import { Users, Calendar, MapPin, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ClubCardProps {
  club: any
  // onClick: () => void
}

export function ClubCard({ club }: ClubCardProps) {

  return (
    <div
      // onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray p-1 transition-all hover:scale-105 hover:shadow-lg"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-red/10 to-theme-yellow/5 opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Animated background elements */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-theme-red opacity-5 transition-transform group-hover:scale-150" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-theme-yellow opacity-5 transition-transform group-hover:scale-150" />

      <div className="relative space-y-4 p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold group-hover:text-theme-red transition-colors">{club.name}</h3>
          </div>
          <ExternalLink className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{club.description}</p>

        {/* Stats */}
        {/* <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-black/40 p-3">
            <Users className="h-4 w-4 text-theme-red" />
            <div>
              <p className="text-xs text-muted-foreground">Members</p>
              <p className="font-semibold">{club.memberCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-black/40 p-3">
            <Calendar className="h-4 w-4 text-theme-yellow" />
            <div>
              <p className="text-xs text-muted-foreground">Meetings</p>
              <p className="font-semibold text-xs">{club.meetingTime.split(",")[0]}</p>
            </div>
          </div>
        </div> */}

        {/* Meeting Info */}
        {/* <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-theme-red" />
            <span className="text-muted-foreground">{club.location}</span>
          </div>
        </div> */}

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all duration-300 group-hover:w-full" />
      </div>
    </div>
  )
}
