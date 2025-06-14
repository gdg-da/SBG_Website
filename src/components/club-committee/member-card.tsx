"use client"

import { Mail, User, GraduationCap } from "lucide-react"
import Image from "next/image"

interface MemberCardProps {
  member: {
    id: number
    name: string
    // role: string
    // year: string
    // major: string
    image: string
    // bio: string
  }
}

export function MemberCard({ member }: MemberCardProps) {

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray-light p-1 transition-all hover:scale-105">
      {/* Animated background */}
      <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-theme-red opacity-10 transition-transform group-hover:scale-150" />
      <div className="absolute -bottom-10 -left-10 h-20 w-20 rounded-full bg-theme-yellow opacity-10 transition-transform group-hover:scale-150" />

      <div className="relative space-y-4 p-5">
        {/* Profile Image and Role */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-theme-gray-lighter">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {/* <div className="flex-1">
            <h4 className="text-lg font-bold group-hover:text-theme-red transition-colors">{member.name}</h4>
            <p className="text-sm font-semibold text-theme-yellow">{member.role}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{member.year}</span>
              <span>•</span>
              <GraduationCap className="h-3 w-3" />
              <span>{member.major}</span>
            </div>
          </div> */}
        </div>

        {/* Contact Button */}
        {/* <div className="flex justify-end">
          <button className="flex items-center gap-2 rounded-full bg-theme-gray-lighter/30 px-3 py-1 text-xs transition-colors hover:bg-theme-red hover:text-white">
            <Mail className="h-3 w-3" />
            Contact
          </button>
        </div> */}

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all duration-300 group-hover:w-full" />
      </div>
    </div>
  )
}