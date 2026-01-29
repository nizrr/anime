import SeasonNowAnime from "@/app/(root)/SeasonNowAnime";
import TopAnime from "@/app/(root)/TopAnime";
import { getSeasonNowAnime, getTopAnime, getUpcomingAnime } from "@/lib/api";
import { UpcomingAnime } from "./UpcomingAnime";

export default async function Home() {
    const topAnime = await getTopAnime();
    const seasonNowAnime = await getSeasonNowAnime();
    const upcomingAnime = await getUpcomingAnime("limit=5");
    return (
        <>
            <UpcomingAnime anime={upcomingAnime} />
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-4">
                    <TopAnime anime={topAnime} />
                    <SeasonNowAnime anime={seasonNowAnime} />
                </div>
            </div>
        </>
    );
}
