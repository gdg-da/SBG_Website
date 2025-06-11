"use client";

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
// import { Twitter, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <div className='flex justify-center items-center'>
    <div className="mt-24 w-[90vw]">
      <Separator className="bg-white" />
      <Card >
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <ul className="space-y-1 text-[#808080]">
                <li>
                  <a href="mailto:sbg@dau.ac.in" target="_blank" className="hover:text-white hover:underline">
                    sbg@dau.ac.in
                  </a>
                </li>
                <li>SBG DAU, Gandhinagar, Gujarat, India</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                {/* <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#808080] hover:text-blue-500"
                  aria-label="Twitter"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#808080] hover:text-blue-500"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#808080] hover:text-blue-500"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a> */}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Other Links</h3>
              <ul className="space-y-1 text-[#808080]">
                <li>
                  <Link href="https://www.daiict.ac.in/" target="_blank" className="hover:underline hover:text-white">
                    DAIICT website
                  </Link>
                </li>
                <li>
                  <Link href="https://ecampus.daiict.ac.in/webapp/intranet/index.jsp" target="_blank" className="hover:underline hover:text-white">
                    Ecampus
                  </Link>
                </li>
                <li>
                  <Link href="https://moodle.daiict.ac.in/" target="_blank" className="hover:underline hover:text-white">
                    Moodle
                  </Link>
                </li>
                <li>
                  <Link href="http://intranet.daiict.ac.in/" target="_blank" className="hover:underline hover:text-white">
                    Intranet
                  </Link>
                </li>
                <li>
                  <Link href="http://placement.daiict.ac.in/" target="_blank" className="hover:underline hover:text-white">
                    Placements
                  </Link>
                </li>
                <li>
                  <Link href="https://opac.daiict.ac.in/" target="_blank" className="hover:underline hover:text-white">
                    Resource Center Catalogue
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}