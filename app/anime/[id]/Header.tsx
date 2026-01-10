'use client'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import { Synopsis } from '@/components/Synopsis'
const Header = ({ anime }: { anime: any }) => {
   return (
      <div
         className="header min-h-[500px] p-5 bg-red-50 flex items-center bg-cover bg-center filter relative"
         style={{ backgroundImage: `url(${anime.images.webp.large_image_url})` }}>
         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
         <div className="container mx-auto relative">
            <div className="flex flex-col md:flex-row gap-6">
               <div className="relative aspect-3/4 shrink-0 h-[400px] rounded-4xl overflow-hidden mx-auto md:mx-0">
                  <Image
                     src={anime.images.webp.image_url}
                     alt="cover"
                     fill
                     className="object-cover"
                  />
               </div>
               <div className="flex flex-col gap-3">
                  <h1 className="text-2xl lg:text-4xl font-semibold">
                     {anime.title} ({anime.title_english})
                  </h1>
                  <p className="flex gap-2 items-center">
                     <Icon icon={'tabler:star-filled'} className="text-yellow-300" />{' '}
                     <span className="font-semibold">{anime.score}</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                     <p>
                        <span className="text-slate-400">Episodes :</span> {anime.episodes}
                     </p>
                     <p>
                        <span className="text-slate-400">Tahun :</span> {anime.year}
                     </p>
                     <p>
                        <span className="text-slate-400">Status :</span> {anime.status}
                     </p>
                     <p>
                        <span className="text-slate-400">Durasi :</span> {anime.duration}
                     </p>
                  </div>
                  <p className="flex gap-2 items-center">
                     <span className="text-slate-400">Genre :</span>
                     {anime.genres.map((genre: any) => genre.name).join(', ')}
                  </p>
                  <p className="flex gap-2 items-center">
                     <span className="text-slate-400">Studios :</span>
                     {anime.studios.map((studio: any) => studio.name).join(', ')}
                  </p>
                  <Synopsis text={anime.synopsis} />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Header
