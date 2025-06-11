'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import sbglogo from "@/data/sbglogo.png";
import resouresData from "@/data/resources.json"

export default function Resources() {
  const [imageError, setImageError] = useState(false);

  const categories = ['All', 'Acad', 'Programming', 'Development', 'Guide', 'Other'];

  return (
    <div className="container mx-auto p-6 max-w-[90vw] min-h-screen flex flex-col">
      <Card className="shadow-sm border-none rounded-lg flex-grow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {imageError ? (
              <span className="text-red-500">Logo Error</span>
            ) : (
              <Image
                src={sbglogo}
                alt="SBG Logo"
                width={80}
                height={80}
                className="inline-block"
                priority
                onError={() => {
                  console.log('SBG logo failed to load');
                  setImageError(true);
                }}
              />
            )}
            <p className="text-4xl font-bold">Resources</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="grid w-full lg:grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 
                sm:grid sm:grid-cols-2 sm:gap-4
                md:grid-cols-4 md:gap-4">
                  {resouresData
                    .filter((resource) => category === 'All' || resource.category === category)
                    .map((resource) => (
                      <Card key={resource.id} className="shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-base font-medium">
                            {resource.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm">{resource.description}</p>
                          <p className="text-gray-500 text-sm mt-1">
                            By: {resource.by}
                          </p>
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm mt-2 inline-block"
                          >
                            Visit Resource
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}