import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

export const UpcomingAnime = ({ anime }: { anime: any }) => {
   const { data } = anime
   return (
      <section className="w-full">
         <Carousel
            opts={{
               align: 'start',
            }}
            className="w-full container mx-auto">
            <CarouselContent className="-ml-4">
               {data?.map((anime: any, index: number) => (
                  <CarouselItem key={index} className="pl-4 ">
                     <div className="bg-accent h-[500px] rounded-2xl overflow-hidden relative w-full">
                        {anime.trailer?.embed_url ? (
                           <iframe
                              src={`${anime.trailer.embed_url}&autoplay=1&mute=1&loop=1`}
                              title={anime.title}
                              className="absolute w-[2000px] h-[1250px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover brightness-90 pointer-events-none"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           />
                        ) : (
                           anime.images?.jpg?.image_url && (
                              <img
                                 src={
                                    anime.images.jpg.large_image_url || anime.images.jpg.image_url
                                 }
                                 alt={anime.title}
                                 className="w-full h-full object-cover brightness-50"
                              />
                           )
                        )}
                        <div className="absolute left-20 top-1/2 -translate-y-1/2 z-10">
                           <h1 className="text-white font-bold truncate text-5xl max-w-2xl">
                              {anime.title}
                           </h1>
                           <p className="text-white/80 line-clamp-2 max-w-xl mt-2">
                              {anime.synopsis}
                           </p>
                           <Button className="mt-4">Watch Now</Button>
                        </div>
                     </div>
                  </CarouselItem>
               ))}
               {!data &&
                  [1, 2, 3].map((_, index) => (
                     <CarouselItem
                        key={index}
                        className="pl-4 basis-[85%] md:basis-[45%] lg:basis-[31%]">
                        <div className="bg-accent h-[500px] rounded-2xl overflow-hidden flex items-center justify-center">
                           ...
                        </div>
                     </CarouselItem>
                  ))}
            </CarouselContent>
         </Carousel>
      </section>
   )
}
