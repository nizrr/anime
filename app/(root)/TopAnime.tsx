"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ClassNames from "embla-carousel-class-names";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import TopAnimeCard from "@/components/TopAnimeCard";
import { Badge } from "@/components/ui/badge";
import FallingStars from "@/components/FallingStars";

type AnimeCardProps = {
    id: number;
    title: string;
    image: string;
};

const TopAnime = ({ anime }: { anime: any }) => {
    const [api, setApi] = useState<CarouselApi>();
    const [currentAnime, setCurrentAnime] = useState<any>(null);
    const data = anime.data;
    // const [api, setApi] = useState<CarouselApi>();
    const count = 12;

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollPrev = () => {
        if (!containerRef.current) return;
        containerRef.current.scrollLeft -= 300;
    };
    const scrollNext = () => {
        if (!containerRef.current) return;
        containerRef.current.scrollLeft += 300;
    };

    const [currentSlide, setCurrentSlide] = useState(1);

    useEffect(() => {
        if (!api) return;
        setCurrentSlide(api.selectedScrollSnap() + 1);
        setCurrentAnime(data[api.selectedScrollSnap()]);
        api.on("select", () => {
            setCurrentSlide(api.selectedScrollSnap() + 1);
            setCurrentAnime(data[api.selectedScrollSnap()]);
        });
    }, [api]);

    return (
        <div className="relative w-full h-dvh bg-[url('/images/bg-night.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden sticky top-0">
            <div className="absolute inset-0 bg-black/60" />
            <FallingStars />
            <div className="container mx-auto h-full flex flex-col justify-center relative z-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-5xl font-bold font-clash mx-auto my-4 mt-10 text-white">
                        Top Anime
                    </h1>
                </div>
                <div ref={containerRef} className="flex overflow-hidden gap-3">
                    <Carousel
                        setApi={setApi}
                        plugins={[ClassNames(), Autoplay({ delay: 5000 })]}
                        opts={{
                            align: "center",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="items-center  py-10 ">
                            {data.map((anime: any, itemIndex: number) => {
                                return (
                                    <CarouselItem
                                        key={`${itemIndex}`}
                                        className="anime-carousel-item basis-1/5 transition-all duration-300 "
                                    >
                                        <div className="anime-card-item block relative group ">
                                            <TopAnimeCard
                                                onClick={() =>
                                                    api?.scrollTo(itemIndex)
                                                }
                                                id={anime.mal_id}
                                                image_url={
                                                    anime.images.jpg
                                                        .large_image_url
                                                }
                                                title={anime.title}
                                            />
                                            {currentSlide === itemIndex + 1 && (
                                                <Link
                                                    href={`/anime/${anime.mal_id}`}
                                                    className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl z-20 cursor-pointer"
                                                >
                                                    <Icon
                                                        icon="lucide:play-circle"
                                                        className="text-white w-16 h-16 drop-shadow-lg scale-0 group-hover:scale-110 transition-all duration-300"
                                                    />
                                                </Link>
                                            )}
                                        </div>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className="flex items-center justify-center gap-2 mt-10">
                    <Badge variant="outline">
                        <Icon icon="lucide:star" /> {currentAnime?.score}
                    </Badge>
                    <Badge variant="outline">
                        {currentAnime?.episodes} Episodes
                    </Badge>
                    <Badge variant="outline">
                        <Icon icon="lucide:clock" /> {currentAnime?.status}
                    </Badge>
                    <Badge variant="outline">
                        <Icon icon="lucide:calendar" /> {currentAnime?.year}
                    </Badge>
                </div>
                <h1 className="text-3xl font-bold  mx-auto  text-white py-2">
                    {currentAnime?.title}
                </h1>
                <p className="text-white text-center">
                    {currentAnime?.title_japanese}
                </p>
                <p className=" text-center line-clamp-2 max-w-2xl mx-auto text-white/70 mt-2">
                    {currentAnime?.synopsis}
                </p>
            </div>
        </div>
    );
};

export default TopAnime;
