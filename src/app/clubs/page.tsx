"use client";

import Link from "next/link";
import { Search, Camera, Drama, Popcorn, BrainCircuit, Code, Palette, Microscope, Infinity, Cpu, ShieldHalf, Lightbulb, Radio, MessageCircleCode, Swords, Newspaper, Puzzle, Music, Sparkles, Rocket } from "lucide-react";
import Image from "next/image";
import { ComponentProps, useEffect, useState } from "react";
import { Users } from "lucide-react";
import { ClubCard } from "@/components/club-committee/club-card";
// import { ClubModal } from "@/components/club-committee/club-modal";
import { FuturisticDivider } from "@/components/futuristic-divider";
import { Input } from "@/components/ui/input";

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

const clubIcons: Record<string, React.ElementType | ((props: React.SVGProps<SVGSVGElement> | React.ComponentProps<typeof Image>) => JSX.Element)> = {
    "PMMC": Camera,
    "Daiict Theatres Group": Drama,
    "Film Club": Popcorn,
    "AI Club": BrainCircuit,
    "Microsoft Student Technical Club": Code,
    "Muse- The Designing Club": Palette,
    "Research Club": Microscope,
    "Programming Club": Infinity,
    "Electronics Hobby Club": Cpu,
    "Cyber Information and Network Security Club": ShieldHalf,
    "Headrush": Lightbulb,
    "DADC": (props: ComponentProps<'div'>) => (<div className="w-6 h-6" {...props}><Image src="/dance icon.png" alt="DADC Dance Icon" width={24} height={24} style={{ objectFit: 'contain', filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(118deg) brightness(118%) contrast(119%)' }} /></div>),
    "The Radio Club": Radio,
    "The Debating Society": MessageCircleCode,
    "Chess Club": Swords,
    "Press Club": Newspaper,
    "Cubing Club": Puzzle,
    "The Music Club": Music,
    "Khelaiya Club": Sparkles,
    "Google Developer Group": Rocket
};

export default function ClubsPage() {
    // const [selectedClub, setSelectedClub] = useState<Club>();
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredClubs = clubs.filter((club) => {
        const matchesSearch =
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.convenerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.dyConvenerName.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    })

    // const handleClubClick = (club: Club) => {
    //     setSelectedClub(club)
    //     setIsModalOpen(true)
    // }

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await fetch('/api/clubs');
                const data = await response.json();
                setClubs(data);
            } catch (error) {
                console.error('Error fetching clubs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

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
                    <div className="inline-flex items-center rounded-full border border-theme-gray-light bg-theme-gray-light/30 px-3 py-1 text-sm backdrop-blur-sm">
                    <Users className="mr-2 h-4 w-4 text-theme-yellow" />
                    Student Organizations
                    </div>
                    <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                    <span className="bg-gradient-to-r from-white to-theme-gray-lighter bg-clip-text text-transparent">
                        Student
                    </span>{" "}
                    <span className="bg-gradient-to-r from-theme-yellow to-theme-red bg-clip-text text-transparent">
                        Clubs
                    </span>
                    </h1>
                    <p className="mt-4 text-xl text-muted-foreground">
                    Discover and join our diverse range of clubs, each offering unique opportunities to learn, create, and connect with like-minded individuals.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="h-3 w-3 rounded-full bg-theme-red"></div>
                        <span>{clubs.length} Active Clubs</span>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            {/* Main Content */}
      <section className="container px-4 py-12 md:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Filters and Search */}
          <div className="mb-8 rounded-2xl border border-theme-gray-light bg-theme-gray p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-4">
                <p className="text-xl mr-4 text-muted-foreground">Search Clubs</p>
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search clubs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-full border-theme-gray-light bg-theme-gray-light/30 focus-visible:ring-theme-red"
                  />
                </div>
                {/* <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px] rounded-full border-theme-gray-light bg-theme-gray-light/30">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="border-theme-gray-light bg-theme-black">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </div>
            </div>
            {/* <div className="flex flex-wrap gap-2">
              {Array.from(new Set(clubs.map((club) => club.category))).map((category) => (
                <div key={category} className="flex items-center gap-2 text-sm">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      category === "Technology" || category === "Academic"
                        ? "bg-theme-red"
                        : category === "Arts" || category === "Cultural"
                          ? "bg-theme-yellow"
                          : "bg-theme-gray-lighter"
                    }`}
                  ></div>
                  <span>{category}</span>
                </div>
              ))}
            </div> */}
          </div>

        <FuturisticDivider className="my-4" />

          {/* Clubs Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClubs.map((club) => (
            //   <ClubCard key={club.id} club={club} onClick={() => handleClubClick(club)} />
                <Link key={club.id} href={`/clubs/${club.id}`}><ClubCard key={club.id} club={club}/></Link>
            ))}
          </div>

          {filteredClubs.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-theme-gray-light/30 flex items-center justify-center">
                <Users className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No clubs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Club Modal */}
      {/* <ClubModal club={selectedClub} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
        </div>
    );
}