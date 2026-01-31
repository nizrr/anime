// components/anime/SearchResults.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { parseAsString, useQueryState } from 'nuqs'
import { useDebounce } from 'use-debounce'
import { getAnimeBySearch } from '@/lib/api'
import AnimeCard from '@/components/AnimeCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll'
import Link from 'next/link'

export function SearchResults({ onClose }: { onClose?: () => void }) {
   useLockBodyScroll(true)
   // 1. Ambil query dari URL
   const [query] = useQueryState('q', parseAsString.withDefault(''))

   // 2. Debounce query-nya (tunggu 500ms setelah user berhenti mengetik)
   // Ini PENTING agar kita tidak memanggil API Jikan setiap ketikan huruf
   const [debouncedQuery] = useDebounce(query, 1000)

   // 3. React Query Magic
   const { data, isLoading, isError, error } = useQuery({
      queryKey: ['searchAnime', debouncedQuery], // Cache key unik berdasarkan query
      queryFn: () => getAnimeBySearch(debouncedQuery),
      // Hanya fetch jika user ketik >= 3 huruf DAN query sudah selesai di-debounce
      // 'query' adalah input real-time, 'debouncedQuery' adalah input yang tertunda
      // Jika mereka berbeda, berarti user masih mengetik/menghapus -> JANGAN fetch dulu
      enabled: debouncedQuery.length >= 3 && query === debouncedQuery,
      placeholderData: previousData => previousData, // Keep data lama saat loading data baru (transisi mulus)
      staleTime: 1000 * 60 * 5, // Cache data selama 5 menit agar tidak fetch ulang saat backspace
   })

   // State: Belum mencari
   if (!debouncedQuery) {
      return <p className="text-center text-white/50 mt-10">Mulai ketik untuk mencari anime...</p>
   }

   // State: Loading
   if (isLoading) {
      return (
         <div className="space-y-4 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
               <div key={i} className="flex gap-4 items-center">
                  <Skeleton className="h-[100px] w-[100px] rounded-xl bg-white/5 shrink-0" />
                  <div className="space-y-2 w-full">
                     <Skeleton className="h-4 w-10 bg-white/5" />
                     <Skeleton className="h-4 w-3/4 bg-white/5" />
                  </div>
               </div>
            ))}
         </div>
      )
   }

   // State: Error
   if (isError) {
      const message = (error as Error).message
      const isRateLimit = message.includes('429')
      return (
         <p className="text-center text-red-400 mt-10">
            {isRateLimit ? 'Too many requests. Please wait a moment.' : `Error: ${message}`}
         </p>
      )
   }

   // State: Tidak ditemukan
   if (!data?.data || data.data.length === 0) {
      return (
         <p className="text-center text-white/50 mt-10">
            Tidak ada anime ditemukan untuk "{debouncedQuery}"
         </p>
      )
   }

   // State: Success
   return (
      //custom style scroll bar
      <div
         className="space-y-6 custom-scrollbar-vertical animate-in fade-in zoom-in duration-500 p-4 block overflow-auto h-[350px] overscroll-contain"
         onWheel={e => e.stopPropagation()}>
         {data.data.map((anime: any, index: number) => (
            <div className="flex gap-4 items-center group" key={index}>
               <div className="relative h-[100px] w-[100px] aspect-3/4 rounded-xl overflow-hidden shrink-0">
                  <Image
                     src={anime.images.webp.large_image_url}
                     alt={anime.title}
                     fill
                     className=" object-cover transition-all duration-300 "
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px)  50vw, 33vw"
                     loading="eager"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent " />
               </div>
               <Link
                  className="group-hover:text-primary transition-colors duration-300 cursor-pointer"
                  href={`/anime/${anime.mal_id}`}
                  onClick={onClose}>
                  <p className="text-sm flex items-center gap-1">
                     <Icon icon="tabler:star-filled" className="inline text-yellow-300" />{' '}
                     {anime.score}
                  </p>
                  <p className="font-bold">{anime.title}</p>
               </Link>
            </div>
         ))}
      </div>
   )
}
