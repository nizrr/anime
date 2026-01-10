'use client'

import { Icon } from '@iconify/react'
import AnimeCard from '../../components/AnimeCard'
import HorizontalScroll from '../../components/HorizontalScroll'
import { Button } from '../../components/ui/button'
import { useRef } from 'react'
import Link from 'next/link'

type AnimeCardProps = {
   id: number
   title: string
   image: string
}

const TopAnime = ({ anime }: { anime: any }) => {
   const data = anime.data
   const containerRef = useRef<HTMLDivElement>(null)
   const scrollPrev = () => {
      if (!containerRef.current) return
      containerRef.current.scrollLeft -= 300
   }
   const scrollNext = () => {
      if (!containerRef.current) return
      containerRef.current.scrollLeft += 300
   }
   return (
      <div className="container mx-auto">
         <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold my-3">Top Anime</h1>
            <div className="flex gap-3">
               <Button onClick={scrollPrev}>
                  <Icon icon="tabler:chevron-left" />
               </Button>
               <Button onClick={scrollNext}>
                  <Icon icon="tabler:chevron-right" />
               </Button>
            </div>
         </div>
         <div ref={containerRef} className="flex overflow-hidden gap-3 scroll-smooth">
            {data.slice(0, 12).map((item: any) => (
               <Link href={`anime/${item.mal_id}`} key={item.mal_id}>
                  <AnimeCard
                     id={item.mal_id}
                     title={item.title}
                     image_url={item.images.webp.image_url}
                     score={item.score}
                  />
               </Link>
            ))}
         </div>
      </div>
   )
}

export default TopAnime
