'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import resouresData from "@/data/resources.json"
import Link from 'next/link';

export default function Resources() {
    const categories = ['All', 'Acad', 'Programming', 'Development', 'Guide', 'Other'];

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
                        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl"><span className="bg-gradient-to-r from-theme-yellow to-theme-red bg-clip-text text-transparent">Resources</span></h1>
                        <p className="mt-4 text-xl text-muted-foreground">Curated list of resources useful in every student&apos;s life at DAU</p>
                    </div>
                </div>
            </section >
            <div className="container mx-auto mt-6 p-6 flex flex-col">
                <section className="container px-4 py-12 md:px-6">
                    <div className="relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray">
                        <div className="absolute inset-0 bg-gradient-to-br from-theme-red/20 to-theme-yellow/5 opacity-50" />
                        <div className="relative mx-auto max-w-7xl">
                            <Tabs defaultValue="All" className="w-full mt-6">
                                <TabsList className="grid h-fit w-full grid-cols-[repeat(auto-fit,minmax(80px,1fr))] max-sm:gap-2 md:gap-4">
                                    {categories.map((category) => (<TabsTrigger className="rounded-full text-sm max-sm:text-xs max-sm:py-1 md:py-2 data-[state=active]:bg-theme-red data-[state=active]:text-white" key={category} value={category}>{category}</TabsTrigger>))}
                                </TabsList>
                                {categories.map((category) => (
                                    <TabsContent key={category} value={category}>
                                        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-4md:grid-cols-4 md:gap-4 max-sm:mt-4">
                                            {resouresData
                                                .filter((resource) => category === 'All' || resource.category === category)
                                                .map((resource) => (
                                                    <div key={resource.id} className="group w-full p-2 relative overflow-hidden rounded-2xl border border-theme-gray-light bg-theme-gray transition-all hover:shadow-lg">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-theme-red/10 to-theme-yellow/5 opacity-0 transition-opacity group-hover:opacity-100" />
                                                        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-theme-red opacity-5 transition-transform group-hover:scale-150" />
                                                        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-theme-yellow opacity-5 transition-transform group-hover:scale-150" />
                                                        <Card key={resource.id} className="shadow-sm border-0">
                                                            <CardHeader><CardTitle className="text-base font-medium">{resource.title}</CardTitle></CardHeader>
                                                            <CardContent>
                                                                <p className="text-gray-300 text-sm">{resource.description}</p>
                                                                <p className="text-gray-500 text-sm mt-1 mb-2">By: {resource.by}</p>
                                                                <Link href={resource.link} target="_blank" rel="noopener noreferrer" className="text-sm group relative text-muted-foreground hover:text-theme-red">Visit Resource<span className="absolute -bottom-1 left-0 h-px w-0 bg-theme-red transition-all group-hover:w-full"></span></Link>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                ))}
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}