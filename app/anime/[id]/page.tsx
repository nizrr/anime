import { getAnimeById, getVideosById } from '@/lib/api'

import Header from './Header'
import Videos from './Videos'

type PageProps = {
   params: Promise<{
      id: string
   }>
}

async function AnimeDetailPage({ params }: PageProps) {
   const { id } = await params
   const data = await getAnimeById(id)
   const videos = await getVideosById(id)
   const anime = data.data
   return (
      <main className="">
         <Header anime={anime} />
         <Videos data={videos} />
      </main>
   )
}

export default AnimeDetailPage
