"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Calendar, Users, Award } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-emerald-500/20 z-0" />
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center z-10 px-4"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-8 flex justify-center"
                    >
                        <Image
                            src="/SBG_logo.jpeg"
                            alt="SBG Logo"
                            width={200}
                            height={200}
                            className="rounded-full shadow-lg shadow-emerald-500/20"
                            priority
                        />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Student Body <span className="text-emerald-400">Government</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Powered by people, driven by purpose
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link 
                            href="/events"
                            className="inline-flex items-center px-8 py-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                        >
                            Explore Events <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-black/40 p-6 rounded-lg border border-blue-900/50 hover:border-emerald-500/50 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="text-emerald-400" size={24} />
                            <h3 className="text-xl font-semibold text-white">Upcoming Events</h3>
                        </div>
                        <p className="text-4xl font-bold text-emerald-400">12</p>
                        <p className="text-gray-400">Next 7 days</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-black/40 p-6 rounded-lg border border-blue-900/50 hover:border-emerald-500/50 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Users className="text-emerald-400" size={24} />
                            <h3 className="text-xl font-semibold text-white">Active Clubs</h3>
                        </div>
                        <p className="text-4xl font-bold text-emerald-400">24</p>
                        <p className="text-gray-400">Across Campus</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-black/40 p-6 rounded-lg border border-blue-900/50 hover:border-emerald-500/50 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="text-emerald-400" size={24} />
                            <h3 className="text-xl font-semibold text-white">Committees</h3>
                        </div>
                        <p className="text-4xl font-bold text-emerald-400">8</p>
                        <p className="text-gray-400">Active Teams</p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Events Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-blue-950 to-black">
                <div className="max-w-7xl mx-auto">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-white mb-8"
                    >
                        Featured Events
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-black/40 p-6 rounded-lg border border-blue-900/50 hover:border-emerald-500/50 transition-colors">
                                    <h3 className="text-xl font-semibold text-white mb-2">Annual Tech Fest</h3>
                                    <p className="text-emerald-400 mb-4">May 15, 2024</p>
                                    <p className="text-gray-300">Join us for the biggest tech event of the year featuring workshops, competitions, and networking opportunities.</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
                    <p className="text-gray-300 mb-8">Be part of something bigger. Join a club, participate in events, and make lasting connections.</p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link 
                            href="/clubs"
                            className="inline-flex items-center px-8 py-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                        >
                            Explore Clubs <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}