import TopAnime from '@/components/TopAnime'
import { getTopAnime } from '@/lib/api'
import { Suspense } from 'react'

export default async function Home() {
   const anime = await getTopAnime()
   return (
      <div>
         <Suspense fallback={<div>Loading...</div>}>
            <TopAnime anime={anime} />
         </Suspense>
      </div>
   )
}
