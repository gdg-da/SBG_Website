"use client"
import { X, Users, Calendar, MapPin, Mail, ExternalLink, Award, Clock, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MemberCard } from "@/components/club-committee/member-card"
import { FuturisticDivider } from "@/components/futuristic-divider"

interface Club {
    id: number;
    name: string;
    email: string;
    convenerName: string;
    convenerPhoto: string;
    dyConvenerName: string;
    dyConvenerPhoto: string;
    clubGroupPhoto: string;
    description: string;
}

interface MemberCardProps {
  member: {
    id: number
    name: string
    image: string
  }
}

interface ClubModalProps {
  club: Club | undefined
  isOpen: boolean
  onClose: () => void
}

export function ClubModal({ club, isOpen, onClose }: ClubModalProps) {
  if (!club) return null

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technology":
      case "Academic":
        return "bg-theme-red/20 text-theme-red border-theme-red/30"
      case "Arts":
      case "Cultural":
        return "bg-theme-yellow/20 text-theme-yellow border-theme-yellow/30"
      case "Activism":
      case "Recreation":
        return "bg-theme-gray-lighter/20 text-theme-gray-lighter border-theme-gray-lighter/30"
      default:
        return "bg-theme-gray-lighter/20 text-theme-gray-lighter border-theme-gray-lighter/30"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-theme-gray-light bg-theme-gray">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold">{club.name}</DialogTitle>
              <p className="mt-2 text-muted-foreground">{club.description}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-theme-gray-light">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-full bg-theme-gray-light">
            <TabsTrigger
              value="overview"
              className="rounded-full data-[state=active]:bg-theme-red data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="rounded-full data-[state=active]:bg-theme-red data-[state=active]:text-white"
            >
              Members
            </TabsTrigger>
            {/* <TabsTrigger
              value="events"
              className="rounded-full data-[state=active]:bg-theme-red data-[state=active]:text-white"
            >
              Events
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="overview" className="space-y-6 pt-6">
            {/* Club Stats */}
            {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl bg-black/40 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-theme-red/20">
                  <Users className="h-6 w-6 text-theme-red" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="text-2xl font-bold">{club.memberCount}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-black/40 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-theme-red/20">
                  <Award className="h-6 w-6 text-theme-red" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold">{club.achievements.length}</p>
                </div>
              </div>
            </div> */}

            <div className="rounded-xl bg-black/40 p-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-theme-red" />
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-semibold">{club.email}</p>
                  </div>
                </div>
            </div>

            {/* Meeting Details */}
            {/* <div className="rounded-xl bg-black/40 p-6">
              <h3 className="mb-4 text-xl font-semibold">Meeting Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-theme-red" />
                  <div>
                    <p className="text-sm text-muted-foreground">Schedule</p>
                    <p className="font-semibold">{club.meetingTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-theme-yellow" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{club.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-5 w-5 text-theme-yellow" />
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a href={club.website} className="font-semibold text-theme-red hover:underline">
                      Visit Site
                    </a>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Achievements */}
            {/* <div className="rounded-xl bg-black/40 p-6">
              <h3 className="mb-4 text-xl font-semibold">Recent Achievements</h3>
              <div className="space-y-3">
                {club.achievements.map((achievement: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 rounded-lg bg-theme-gray-light/30 p-3">
                    <Award className="h-5 w-5 text-theme-yellow" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Join Button */}
            {/* <div className="flex justify-center">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-theme-red to-theme-yellow text-black hover:from-theme-red/90 hover:to-theme-yellow/90"
              >
                Join {club.name}
              </Button>
            </div> */}
          </TabsContent>

          <TabsContent value="members" className="space-y-6 pt-6">
            <FuturisticDivider />
            <div className="grid gap-6 sm:grid-cols-2">
                <MemberCard key="1" member={{id:1, name:club.convenerName, image:club.convenerPhoto}} />
                <MemberCard key="2" member={{id:2, name:club.dyConvenerName, image:club.dyConvenerPhoto}} />
            </div>
          </TabsContent>

          {/* <TabsContent value="events" className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Upcoming Events</h3>
              <Badge className="bg-theme-yellow/20 text-theme-yellow border-theme-yellow/30" variant="outline">
                {club.upcomingEvents.length} Events Scheduled
              </Badge>
            </div>
            <FuturisticDivider />
            <div className="space-y-4">
              {club.upcomingEvents.map((event: any, index: number) => (
                <div key={index} className="rounded-xl bg-black/40 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{event.name}</h4>
                      <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full">
                      RSVP
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent> */}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
