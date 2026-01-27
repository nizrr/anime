import SeasonNowAnime from "@/app/(root)/SeasonNowAnime";
import TopAnime from "@/app/(root)/TopAnime";
import { getSeasonNowAnime, getTopAnime } from "@/lib/api";
import { UpcomingAnime } from "./UpcomingAnime";

export default async function Home() {
    const topAnime = await getTopAnime();
    const seasonNowAnime = await getSeasonNowAnime();
    const 
    return (
        <main className="container mx-auto">
            <UpcomingAnime />
            <div className="grid grid-cols-1 gap-4">
                <TopAnime anime={topAnime} />
                <SeasonNowAnime anime={seasonNowAnime} />
            </div>
        </main>
    );
}
