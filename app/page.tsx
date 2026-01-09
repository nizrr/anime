import SeasonNowAnime from '@/components/SeasonNowAnime'
import TopAnime from '@/components/TopAnime'
import { getSeasonNowAnime, getTopAnime } from '@/lib/api'

export default async function Home() {
   const topAnime = await getTopAnime()
   const seasonNowAnime = await getSeasonNowAnime()
   console.log('🚀 ~ Home ~ seasonNowAnime:', seasonNowAnime)
   return (
      <div>
         <TopAnime anime={topAnime} />
         <SeasonNowAnime anime={seasonNowAnime} />
      </div>
   )
}
