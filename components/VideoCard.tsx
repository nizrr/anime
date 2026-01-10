import React from 'react'
import Image from 'next/image'
import { div } from 'framer-motion/client'

const VideoCard = ({ data }: { data: any }) => {
   return (
      <div>
         <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-3">
            <Image
               src={data.images.jpg.image_url || '/images/no-image.png'}
               alt="cover"
               fill
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               className="object-cover"
            />
         </div>
         <p className="text-sm font-semibold">{data.episode}</p>
         <p className="text-sm text-slate-400">{data.title}</p>
      </div>
   )
}

export default VideoCard
