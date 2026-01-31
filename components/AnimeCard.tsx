import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { Star, StarIcon } from 'lucide-react'
import Image from 'next/image'

const AnimeCard = ({
   id,
   title,
   image_url,
   score,
   className,
   onClick,
}: {
   id: number
   title: string
   image_url: string
   score: number
   className?: string
   onClick?: () => void
}) => {
   return (
      <div
         onClick={onClick}
         className={cn(
            `relative h-[400px] w-full rounded-2xl overflow-hidden shrink-0`,
            className,
         )}>
         <Image
            src={image_url}
            alt={title}
            fill
            className=" object-cover transition-all duration-300 "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px)  50vw, 33vw"
            loading="eager"
         />
         <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent " />
         <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
            <p className="text-sm flex items-center gap-1">
               <Icon icon="tabler:star-filled" className="inline text-yellow-300" /> {score}
            </p>
            <p className="font-bold">{title}</p>
         </div>   
      </div>
   )
}

export default AnimeCard
