"use client";

import { Icon } from "@iconify/react";
import AnimeCard from "../../components/AnimeCard";
import HorizontalScroll from "../../components/HorizontalScroll";
import { Button } from "../../components/ui/button";
import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ClassNames from "embla-carousel-class-names";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type AnimeCardProps = {
    id: number;
    title: string;
    image: string;
};

const TopAnime = ({ anime }: { anime: any }) => {
    const [api, setApi] = useState<CarouselApi>();
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
        api.on("select", () => {
            setCurrentSlide(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold  mx-auto my-4 mt-10 text-primary">
                    Top Anime
                </h1>
                {/* <div className="flex gap-3">
                    <Button onClick={scrollPrev}>
                        <Icon icon="tabler:chevron-left" />
                    </Button>
                    <Button onClick={scrollNext}>
                        <Icon icon="tabler:chevron-right" />
                    </Button>
                </div> */}
            </div>
            <div
                ref={containerRef}
                className="flex overflow-hidden gap-3 scroll-smooth "
            >
                <Carousel
                    setApi={setApi}
                    plugins={[ClassNames(), Autoplay({ delay: 3000 })]}
                    opts={{
                        align: "start",
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
                                    <div className="anime-card-item block ">
                                        <AnimeCard
                                            onClick={() =>
                                                api?.scrollTo(itemIndex - 2)
                                            }
                                            id={anime.mal_id}
                                            title={anime.title}
                                            image_url={
                                                anime.images.webp.image_url
                                            }
                                            score={anime.score}
                                        />
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};

export default TopAnime;
