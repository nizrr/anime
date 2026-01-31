import SeasonNowAnime from '@/app/(root)/SeasonNowAnime'
import TopAnime from '@/app/(root)/TopAnime'
import { getSeasonNowAnime, getTopAnime, getUpcomingAnime } from '@/lib/api'
import { UpcomingAnime } from './UpcomingAnime'
import AnimeGallery from '@/app/(root)/AnimeGallery'

export default async function Home() {
   const topAnime = await getTopAnime()
   const seasonNowAnime = await getSeasonNowAnime('limit=5')
   const upcomingAnime = await getUpcomingAnime('limit=5')
   return (
      <>
         <UpcomingAnime anime={upcomingAnime} />
         <TopAnime anime={topAnime} />
         {/* <SeasonNowAnime anime={seasonNowAnime} /> */}
         <AnimeGallery animeList={seasonNowAnime.data} />
      </>
   )
}
