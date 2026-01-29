"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

export const UpcomingAnime = ({ anime }: { anime: any }) => {
    const { data } = anime;

    const getYoutubeId = (url: string) => {
        if (!url) return null;
        const match = url.match(/\/embed\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    };

    const [api, setApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(1);

    useEffect(() => {
        if (!api) return;
        setCurrentSlide(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrentSlide(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <section className="w-full ">
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 10000,
                        stopOnInteraction: false,
                        stopOnMouseEnter: true,
                    }),
                ]}
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full container mx-auto rounded-b-2xl overflow-hidden border-0"
            >
                <CarouselContent className="-ml-4 ">
                    {data?.map((anime: any, index: number) => {
                        const videoId =
                            anime.trailer?.youtube_id ||
                            getYoutubeId(anime.trailer?.embed_url);

                        return (
                            <CarouselItem key={index} className="pl-4 border-0">
                                <div className="bg-accent h-[700px] rounded-b-2xl overflow-hidden relative w-full">
                                    {anime.trailer?.embed_url ? (
                                        <iframe
                                            src={`${anime.trailer.embed_url}&autoplay=1&mute=1&loop=1&playlist=${videoId}`}
                                            title={anime.title}
                                            className="absolute w-[2000px] h-[900px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover brightness-100 pointer-events-none"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;web-share;"
                                        />
                                    ) : (
                                        anime.images?.jpg?.image_url && (
                                            <img
                                                src={
                                                    anime.images.jpg
                                                        .large_image_url ||
                                                    anime.images.jpg.image_url
                                                }
                                                alt={anime.title}
                                                className="w-full h-full object-cover brightness-50"
                                            />
                                        )
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-br from-primary/50 via-primary/20 to-transparent z-0" />
                                    <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-transparent z-0" />
                                    <div className="absolute left-30 top-1/2 -translate-y-1/2 z-10 space-y-1">
                                        <div className="flex gap-2">
                                            <Badge variant="outline">
                                                Upcoming Anime
                                            </Badge>
                                            <Badge variant="outline">
                                                {anime.type}
                                            </Badge>
                                        </div>
                                        <h1 className="text-white font-bold  text-5xl max-w-2xl">
                                            {anime.title}
                                        </h1>
                                        <p className="text-white/80 line-clamp-2 max-w-xl ">
                                            {anime.synopsis}
                                        </p>
                                        <div className="flex flex-wrap gap-2 ">
                                            {anime.genres?.map((genre: any) => (
                                                <Badge
                                                    key={genre.mal_id}
                                                    variant="outline"
                                                >
                                                    {genre.name}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <Button
                                                className="mt-4 group"
                                                size={"lg"}
                                            >
                                                Watch Trailer{" "}
                                                <Icon
                                                    icon="mdi:play"
                                                    className="group-hover:translate-x-1 transition-all duration-300"
                                                />
                                            </Button>
                                            <Button
                                                className="mt-4 group"
                                                variant="ghost"
                                                size={"lg"}
                                            >
                                                Add to List{" "}
                                                <Icon
                                                    icon="mdi:plus"
                                                    className="group-hover:translate-x-1 transition-all duration-300"
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}

                    {!data &&
                        [1, 2, 3].map((_, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-4 basis-[85%] md:basis-[45%] lg:basis-[31%]"
                            >
                                <div className="bg-accent h-[500px] rounded-2xl overflow-hidden flex items-center justify-center">
                                    ...
                                </div>
                            </CarouselItem>
                        ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-10 top-1/2 -translate-y-1/2 backdrop-blur-2xl bg-white/10 border border-white/20" />
                <CarouselNext className="absolute right-10 top-1/2 -translate-y-1/2 backdrop-blur-2xl bg-white/10 border border-white/20" />
            </Carousel>
            <div className="container mx-auto mt-4 px-1">
                <div className="flex gap-4">
                    {data?.map((anime: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className="w-full h-[80px] rounded-lg relative cursor-pointer"
                        >
                            <img
                                src={
                                    anime.images.jpg.large_image_url ||
                                    anime.images.jpg.image_url
                                }
                                alt={anime.title}
                                className={`w-full h-full object-cover transition-all duration-300 rounded-lg ${currentSlide === index + 1 ? "border-2 border-primary scale-105 brightness-100" : "brightness-50"}`}
                            />
                            <h2 className="absolute bottom-2 left-2 text-white text-sm font-semibold truncate w-[250px] z-10">
                                {anime.title}
                            </h2>
                            <div className="bg-linear-to-t from-black/50 via-transparent to-transparent absolute bottom-0 left-0 w-[250px] h-[80px] rounded-lg "></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
