'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
   const pathname = usePathname()

   return (
      <nav className="container mx-auto h-20 py-4 md:px-20 flex items-center justify-between px-10 bg-transparent  top-0 left-0 right-0 z-50 sticky  ">
         <div className="flex gap-8 items-center">
            <Link href="/" className="text-white font-medium">
               <Image src="/images/animotion.png" alt="Logo" width={200} height={100} />
            </Link>
            <Link
               href="/"
               className={`hover:text-white transition-colors duration-300 font-medium ${pathname === '/' ? 'text-white' : 'text-white/70'}`}>
               Home
            </Link>
            <Link
               href="#"
               className="text-white/70 hover:text-white transition-colors duration-300 font-medium">
               Anime
            </Link>
            <Link
               href="#"
               className="text-white/70 hover:text-white transition-colors duration-300 font-medium">
               Manga
            </Link>
         </div>
         <div className="flex gap-4 items-center">
            <div className="relative group">
               <input
                  type="text"
                  placeholder="Search anime..."
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 px-4 py-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 w-48 lg:w-64 text-sm"
               />
               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-4 w-4 text-white/50 group-focus-within:text-white transition-colors"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                     />
                  </svg>
               </div>
            </div>

            <Link
               href="#"
               className="text-white/70 hover:text-white transition-colors duration-300 font-medium">
               Login
            </Link>
         </div>
      </nav>
   )
}

export default Navbar
