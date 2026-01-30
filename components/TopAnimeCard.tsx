import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Star, StarIcon } from "lucide-react";
import Image from "next/image";

const TopAnimeCard = ({
    id,
    title,
    image_url,
    className,
    onClick,
}: {
    id: number;
    title: string;
    image_url: string;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                `relative h-[400px] w-full rounded-2xl overflow-hidden shrink-0`,
                className,
            )}
        >
            <Image
                src={image_url}
                alt={title}
                fill
                className=" object-cover transition-all duration-300 "
                sizes="(max-width: 768px) 100vw, (max-width: 1200px)  50vw, 33vw"
                loading="eager"
            />
        </div>
    );
};

export default TopAnimeCard;
