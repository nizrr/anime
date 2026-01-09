'use client'

const TopAnime = ({ anime }: { anime: any }) => {
   const data = anime.data
   return (
      <div className="container mx-auto">
         <h1 className="text-2xl font-bold">Top Anime</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-auto gap-4">
            {data.map((item: any) => (
               <div key={item.mal_id}>{item.title}</div>
            ))}
         </div>
      </div>
   )
}

export default TopAnime
