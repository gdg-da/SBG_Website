"use client"

import Link from "next/link"
import { GraduationCap, LogIn, LogOut, Menu, Moon, Search, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"

import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { User as FirebaseUser, signInWithPopup, signOut } from "firebase/auth";
import Router from "next/router"

interface Props {
  user: FirebaseUser | null;
  isAuthorized: boolean;
}

export function SiteHeader() {
  const router = Router;
  const [user, setUser] = useState(auth.currentUser);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
      });

      return () => unsubscribe();
  }, []);

  useEffect(() => {
      setIsAuthorized(user?.email === process.env.SBG_EMAIL);
  }, [user?.email]);

  const handleLogin = async () => {
      try {
          const result = await signInWithPopup(auth, googleProvider);
          if (!result.user.email?.endsWith("@dau.ac.in")) {
              await signOut(auth);
              alert("Only @dau.ac.in emails are allowed.");
          }
      } catch (error) {
          console.error("Login Error:", error);
      }
  };

  const handleLogout = async () => {
      await signOut(auth);
      router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-theme-gray-light bg-theme-black/80 backdrop-blur supports-[backdrop-filter]:bg-theme-black/60">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <MainNav user={user} isAuthorized={isAuthorized}/>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* <div className="hidden w-full max-w-sm items-center lg:flex">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-full border-theme-gray-light bg-theme-gray-light/30 pl-8 pr-4 focus-visible:ring-theme-red"
              />
            </div>
          </div> */}
          <nav className="flex items-center space-x-2">
            {/* <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground hover:bg-theme-gray-light hover:text-theme-red"
            >
              <Search className="h-5 w-5 lg:hidden" />
              <span className="sr-only">Search</span>
            </Button> */}
            {user ? (
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:bg-theme-gray-light hover:text-theme-red"
                >
                  <LogIn className="h-5 w-5" />
                  <span className="sr-only">Logout ({user.displayName})</span>
                </Button>
            ) : (
                <Button
                  onClick={handleLogin}
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:bg-theme-gray-light hover:text-theme-red"
                >
                  <LogIn className="h-5 w-5" />
                  <span className="sr-only">Login </span>
                </Button>
            )}
            <ThemeToggle />
            <MobileNav />
          </nav>
        </div>
      </div>
      {/* Decorative bottom line */}
      <div className="h-px bg-gradient-to-r from-transparent via-theme-red to-transparent opacity-50"></div>
    </header>
  )
}

function MainNav({user, isAuthorized}: Props) {
  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-theme-red to-theme-yellow p-[1px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-theme-black">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
        </div>
        <span className="hidden font-bold sm:inline-block">DAU</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link
          href="/events"
          className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Events
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
        </Link>
        <Link
          href="/clubs"
          className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Clubs
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
        </Link>
        <Link
          href="/committees"
          className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Committees
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
        </Link>
        <Link
          href="/sbg"
          className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          SBG
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
        </Link>
        <Link
          href="/resources"
          className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Resources
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
        </Link>

        {user && user.email && isAuthorized && (
            <Link
              href="/add-event"
              className="group relative flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Add Event
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-theme-red to-theme-yellow transition-all group-hover:w-full"></span>
            </Link>
        )}
      </nav>
    </div>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:bg-theme-gray-light hover:text-theme-red md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="border-theme-gray-light bg-theme-black">
        <div className="mb-4 flex items-center gap-2 border-b border-theme-gray-light pb-4">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-theme-red to-theme-yellow p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-theme-black">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
          </div>
          <span className="font-bold">SBG Portal</span>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full border-theme-gray-light bg-theme-gray-light/30 pl-8 pr-4 focus-visible:ring-theme-red"
          />
        </div>
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="/events"
            className="group flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
          >
            Events
            <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
          </Link>
          <Link
            href="/announcements"
            className="group flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
          >
            Announcements
            <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
          </Link>
          <Link
            href="/resources"
            className="group flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
          >
            Resources
            <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
          </Link>
          <Link
            href="/clubs"
            className="group flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
          >
            Clubs
            <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
          </Link>
          <Link
            href="/about"
            className="group flex items-center justify-between rounded-lg p-2 hover:bg-theme-gray-light"
          >
            About
            <div className="h-1.5 w-1.5 rounded-full bg-theme-red opacity-0 transition-opacity group-hover:opacity-100"></div>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:bg-theme-gray-light hover:text-theme-red"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-theme-gray-light bg-theme-black">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
