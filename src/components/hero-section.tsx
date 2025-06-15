"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from 'next/image';

import { Button } from "@/components/ui/button"
import dau from "@/data/dau.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-theme-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-theme-red opacity-20 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[310px] w-[310px] rounded-full bg-theme-yellow opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 top-1/2 -z-10 h-[310px] w-[310px] rounded-full bg-theme-red opacity-20 blur-[100px]"></div>
      </div>

      <div className="container relative z-10 px-4 py-16 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="flex-1 space-y-6">
            <div className="max-sm:w-full max-sm:flex max-sm:justify-center max-sm:items-center">
            <div className="inline-flex items-center rounded-full border border-theme-gray-light bg-theme-gray-light/30 px-3 py-1 text-sm backdrop-blur-sm">
              <span className="mr-2 flex h-2 w-2 rounded-full bg-theme-red"></span>
              SBG DAU
            </div>
            </div>
            <h1 className="text-center text-4xl font-bold tracking-tight lg:text-left lg:text-6xl">
              <span className="bg-gradient-to-r from-white to-theme-gray-lighter bg-clip-text text-transparent">
                Student Body
              </span>{" "}
              <span className="bg-gradient-to-r from-theme-red to-theme-yellow bg-clip-text text-transparent">
                Government
              </span>
            </h1>
            <p className="text-center text-xl text-muted-foreground lg:text-left">
              Powered by people, driven by purpose
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-theme-red to-theme-yellow text-black hover:from-theme-red/90 hover:to-theme-yellow/90"
              >
                <Link href="/events">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-theme-gray-light bg-theme-gray-light/30 backdrop-blur-sm hover:bg-theme-gray-light/50"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-1 justify-center lg:justify-end">
            <div className="relative h-[300px] w-[500px] max-sm:w-[350px] flex justify-center items-center">
                <div className="absolute inset-0 rounded-full bg-theme-red opacity-10 blur-[50px]"></div>
                <Image
                    src={dau}
                    alt="DAU"
                    width={500}
                    height={500}
                    className=""
                    priority
                />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-gray-light to-transparent"></div>
    </section>
  )
}
