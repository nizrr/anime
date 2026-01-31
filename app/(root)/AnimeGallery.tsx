'use client'

import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import YouTubeHoverCard from '@/components/YoutubeHoverCard'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'

// Interface untuk data Anime dari API Jikan
interface AnimeData {
   mal_id: number
   title: string
   year: number
   status: string
   score: number
   images: {
      jpg: {
         large_image_url: string
      }
   }
   genres: { name: string }[]
}

// Komponen Single Item
const AnimeCard = ({
   data,
   index,
   videoId,
}: {
   data: AnimeData
   index: number
   videoId: string
}) => {
   const container = useRef(null)
   const [isHovered, setIsHovered] = useState(false)
   const [mounted, setMounted] = useState(false)
   const router = useRouter()

   // Mouse position using useMotionValue for better performance
   const mouseX = useMotionValue(0)
   const mouseY = useMotionValue(0)

   // Smooth spring animation for cursor
   const springConfig = { damping: 90, stiffness: 700 }
   const cursorX = useSpring(mouseX, springConfig)
   const cursorY = useSpring(mouseY, springConfig)

   useEffect(() => {
      setMounted(true)
   }, [])

   const handleMouseMove = (e: React.MouseEvent) => {
      // We subtract 40 (half width/height) to center the cursor
      mouseX.set(e.clientX - 40)
      mouseY.set(e.clientY - 40)
   }

   // Hook untuk mendeteksi scroll progress pada container ini
   const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start end', 'end start'], // Mulai animasi saat elemen masuk viewport, selesai saat keluar
   })

   // Efek Parallax: Gambar bergerak vertikal sedikit lebih cepat/lambat dari scroll
   const y = useTransform(scrollYProgress, [0, 1], [-50, 50])

   // Efek Scale: Gambar sedikit membesar saat muncul (opsional)
   const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

   const category = data.genres ? data.genres.map(g => g.name).join(' / ') : 'Unknown'

   return (
      <div onClick={() => router.push(`/anime/${data.mal_id}`)}>
         {mounted &&
            isHovered &&
            createPortal(
               <motion.div
                  className="fixed top-0 left-0 z-9999 pointer-events-none flex items-center justify-center bg-primary text-black font-black text-xs rounded-full w-20 h-20 shadow-xl border border-black/10 backdrop-blur-sm mix-blend-difference"
                  style={{
                     x: cursorX,
                     y: cursorY,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  WATCH
               </motion.div>,
               document.body,
            )}

         <div
            ref={container}
            className={`group relative flex w-full items-center justify-between py-24 border-b border-white/20 cursor-none ${
               index % 2 === 0 ? 'flex-row' : 'flex-row-reverse' /* Selang-seling kiri kanan */
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}>
            <div className="w-5/12 px-10">
               <span className="mb-4  text-xs font-medium uppercase tracking-[0.2em] inline-flex items-center gap-2 text-gray-400">
                  {data.year} — {data.status} -
                  <Icon icon="ic:round-star" color="yellow" /> {data.score}
               </span>
               <h2 className="text-6xl font-black uppercase leading-[0.9] tracking-tight text-white transition-colors duration-500 group-hover:text-primary">
                  {data.title}
               </h2>
               <div className="mt-8 flex items-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="h-px w-12 bg-white"></div>
                  <p className="text-sm">View Details</p>
               </div>
            </div>

            <div className="relative h-fit w-6/12 overflow-hidden bg-gray-900 rounded-lg">
               <motion.div style={{ y, scale }} className="relative h-full w-full">
                  <YouTubeHoverCard
                     videoId={videoId}
                     imageSrc={data.images.jpg.large_image_url}
                     title={data.title}
                     forceHover={isHovered}
                  />
               </motion.div>
            </div>
         </div>
      </div>
   )
}

export default function AnimeGallery({ animeList }: { animeList: AnimeData[] }) {
   const getYoutubeId = (url: string) => {
      if (!url) return null
      const match = url.match(/\/embed\/([a-zA-Z0-9_-]+)/)
      return match ? match[1] : null
   }
   return (
      <section className="bg-background min-h-screen w-full px-4 md:px-20 py-20 relative z-50 overflow-hidden">
         <div className="noise-overlay" />
         <div className="mb-20 border-b border-white/10 pb-10 relative z-10">
            <h1 className="text-8xl font-thin text-white tracking-tight">
               <span className="font-bold text-primary">Trending</span>{' '}
               <span className="">Now</span>
            </h1>
         </div>

         <div className="flex flex-col relative z-10">
            {animeList.map((anime: any, index: number) => {
               const videoId = anime.trailer?.youtube_id || getYoutubeId(anime.trailer?.embed_url)
               return <AnimeCard key={anime.mal_id} data={anime} index={index} videoId={videoId} />
            })}
         </div>
      </section>
   )
}
