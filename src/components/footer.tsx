"use client";

import Link from 'next/link';
import { GraduationCap } from "lucide-react"

export function Footer() {
    return (
        <footer className="relative border-t border-theme-gray-light bg-theme-black">
            <div className="h-px bg-gradient-to-r from-transparent via-theme-yellow to-transparent opacity-50"></div>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-theme-red opacity-5"></div>
                <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-theme-yellow opacity-5"></div>
            </div>
            <div className="container relative z-10 px-4 py-8 md:px-6 md:py-12">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-theme-red to-theme-yellow p-[1px]">
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-theme-black">
                                    <GraduationCap className="h-4 w-4 text-white" />
                                </div>
                            </div>
                            <span className="font-bold">Student Body Government (SBG) of DAU</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">SBG DAU, Gandhinagar, Gujarat, India</p>
                        <div className="flex space-x-4">
                            <a href="mailto:sbg@dau.ac.in" target="_blank" className="text-muted-foreground hover:text-theme-red">sbg@dau.ac.in</a>                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Other Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="https://www.daiict.ac.in/" className="group relative text-muted-foreground hover:text-theme-red">
                                    DAIICT Website
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-theme-red transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://ecampus.daiict.ac.in/webapp/intranet/index.jsp" className="group relative text-muted-foreground hover:text-theme-red">
                                    Ecampus
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-theme-red transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://moodle.daiict.ac.in/" className="group relative text-muted-foreground hover:text-theme-red">
                                    Moodle DAIICT
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-theme-red transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="http://intranet.daiict.ac.in/" className="group relative text-muted-foreground hover:text-theme-red">
                                    Intranet
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-theme-red transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="http://placement.daiict.ac.in/" className="group relative text-muted-foreground hover:text-theme-red">
                                    Placement Cell
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-theme-red transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://opac.daiict.ac.in/" className="group relative text-muted-foreground hover:text-theme-red">
                                    Resource Center Catalogue
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-theme-red transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">SBG Information</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/sbg" className="group relative text-muted-foreground hover:text-theme-red">
                                    Meet the Team
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-theme-red transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="group relative text-muted-foreground hover:text-theme-red">
                                    Constitution
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-theme-red transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="group relative text-muted-foreground hover:text-theme-red">
                                    Elections
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-theme-red transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-theme-gray-light pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Student Body Government. All rights reserved.</p>
                    <p className="mt-2 text-xs">Powered by people ✦ Driven by purpose</p>
                    <div className='flex justify-center items-center w-full'>
                        <div className='mt-8 w-1/2 border-t border-theme-gray-light pt-8 text-center text-sm text-muted-foreground'>
                            <Link href="https://github.com/ossdaiict/SBG_Website" target="_blank" rel="noopener noreferrer" className="group relative text-muted-foreground hover:text-theme-red">
                                Developed and maintained by OSS GDG DAIICT
                                <span className="absolute -bottom-1 left-0 h-px w-0 bg-theme-red transition-all group-hover:w-full"></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}