import { getSeasonNowAnime } from "@/lib/api";
import AnimeCard from "./AnimeCard";

const SeasonNowAnime = ({ anime }: { anime: any }) => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold my-3">Season Now Anime</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 overflow-x-auto gap-4">
        {anime.data.slice(0, 12).map((item: any) => (
          <AnimeCard
            key={item.mal_id}
            title={item.title}
            image_url={item.images.webp.image_url}
            score={item.score}
          />
        ))}
      </div>
    </div>
  );
};

export default SeasonNowAnime;
