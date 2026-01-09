"use client";

import AnimeCard from "./AnimeCard";
import HorizontalScroll from "./HorizontalScroll";
import { Button } from "./ui/button";

const TopAnime = ({ anime }: { anime: any }) => {
  const data = anime.data;
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold my-3">Top Anime</h1>
        {/* <Button className="bg-blue-500 text-white px-4 py-2 rounded">
          See More
        </Button> */}
      </div>
      <HorizontalScroll>
        {data.slice(0, 12).map((item: any) => (
          <AnimeCard
            key={item.mal_id}
            title={item.title}
            image_url={item.images.webp.image_url}
            score={item.score}
          />
        ))}
      </HorizontalScroll>
    </div>
  );
};

export default TopAnime;
