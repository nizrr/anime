'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useQueryState, parseAsString } from 'nuqs'
import { SearchResults } from './SearchResults'

const Navbar = () => {
   const pathname = usePathname()
   const [isSearchOpen, setIsSearchOpen] = useState(false)

   return (
      <>
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
               {/* Search Trigger */}
               <div className="relative group cursor-pointer" onClick={() => setIsSearchOpen(true)}>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white/50 px-4 py-3 rounded-full transition-all duration-300 w-48 lg:w-64 text-sm flex items-center justify-between hover:bg-white/20 hover:border-white/40">
                     <span>Search anime...</span>
                  </div>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white/50 group-hover:text-white transition-colors"
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

         <AnimatePresence>
            {isSearchOpen && <SearchCard onClose={() => setIsSearchOpen(false)} />}
         </AnimatePresence>
      </>
   )
}

const SearchCard = ({ onClose }: { onClose: () => void }) => {
   const [search, setSearch] = useQueryState(
      'q',
      parseAsString.withDefault('').withOptions({
         shallow: false,
         throttleMs: 1000,
      }),
   )

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
   }, [onClose])

   return (
      <div className="fixed inset-0 z-9999 flex items-start justify-center pt-32 px-4">
         {/* Backdrop */}
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-xs"
         />

         {/* Modal Content */}
         <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()} // Prevent click from closing when clicking inside modal
         >
            <div className="flex items-center border-b border-white/10 px-4 py-4">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white/50 mr-3"
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
               <input
                  type="text"
                  placeholder="Search anime..."
                  autoFocus
                  value={search || ''}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-transparent text-xl text-white placeholder-white/30 focus:outline-none h-12"
               />
               <div className="text-xs text-white/40 border border-white/20 rounded px-2 py-1 ml-4 hidden md:block">
                  ESC
               </div>
            </div>

            <SearchResults onClose={onClose} />
            <div className="p-4">
               <p className="text-sm text-white/40 mb-4">Trending Searches</p>
               <div className="flex flex-wrap gap-2">
                  {['One Piece', 'Naruto', 'Attack on Titan', 'Jujutsu Kaisen'].map(item => (
                     <button
                        key={item}
                        onClick={() => setSearch(item)}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-sm text-white/70 transition-colors">
                        {item}
                     </button>
                  ))}
               </div>
            </div>
         </motion.div>
      </div>
   )
}

export default Navbar
