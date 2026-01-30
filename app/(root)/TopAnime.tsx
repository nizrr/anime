'use client'

import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ClassNames from 'embla-carousel-class-names'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import TopAnimeCard from '@/components/TopAnimeCard'

type AnimeCardProps = {
   id: number
   title: string
   image: string
}

const TopAnime = ({ anime }: { anime: any }) => {
   const [api, setApi] = useState<CarouselApi>()
   const [currentAnime, setCurrentAnime] = useState('')
   const data = anime.data
   // const [api, setApi] = useState<CarouselApi>();
   const count = 12

   const containerRef = useRef<HTMLDivElement>(null)
   const scrollPrev = () => {
      if (!containerRef.current) return
      containerRef.current.scrollLeft -= 300
   }
   const scrollNext = () => {
      if (!containerRef.current) return
      containerRef.current.scrollLeft += 300
   }

   const [currentSlide, setCurrentSlide] = useState(1)

   useEffect(() => {
      if (!api) return
      setCurrentSlide(api.selectedScrollSnap() + 1)
      setCurrentAnime(data[api.selectedScrollSnap()]?.title || '')
      api.on('select', () => {
         setCurrentSlide(api.selectedScrollSnap() + 1)
         setCurrentAnime(data[api.selectedScrollSnap()]?.title || '')
      })
   }, [api])

   return (
      <div className="relative w-full h-dvh bg-[url('/images/bg-night.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden">
         <div className="absolute inset-0 bg-black/60" />
         <div className="container mx-auto h-full flex flex-col justify-center relative z-10">
            <div className="flex items-center justify-between">
               {/* <h1 className="text-3xl font-bold  mx-auto my-4 mt-10 text-primary">Top Anime</h1> */}
            </div>
            <div ref={containerRef} className="flex overflow-hidden gap-3">
               <Carousel
                  setApi={setApi}
                  plugins={[ClassNames(), Autoplay({ delay: 5000 })]}
                  opts={{
                     align: 'center',
                     loop: true,
                  }}
                  className="w-full">
                  <CarouselContent className="items-center  py-10 ">
                     {data.map((anime: any, itemIndex: number) => {
                        return (
                           <CarouselItem
                              key={`${itemIndex}`}
                              className="anime-carousel-item basis-1/5 transition-all duration-300 ">
                              <div className="anime-card-item block relative group ">
                                 <TopAnimeCard
                                    onClick={() => api?.scrollTo(itemIndex)}
                                    id={anime.mal_id}
                                    image_url={anime.images.webp.image_url}
                                 />
                                 {currentSlide === itemIndex + 1 && (
                                    <Link
                                       href={`/anime/${anime.mal_id}`}
                                       className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl z-20 cursor-pointer">
                                       <Icon
                                          icon="lucide:play-circle"
                                          className="text-white w-16 h-16 drop-shadow-lg scale-0 group-hover:scale-110 transition-all duration-300"
                                       />
                                    </Link>
                                 )}
                              </div>
                           </CarouselItem>
                        )
                     })}
                  </CarouselContent>
               </Carousel>
            </div>
            <h1 className="text-3xl font-bold  mx-auto my-4 mt-10 text-white shadow-lg">
               {currentAnime}
            </h1>
         </div>
      </div>
   )
}

export default TopAnime
