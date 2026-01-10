'use client'
import { Button } from '@/components/ui/button'
import VideoCard from '@/components/VideoCard'
import { motion } from 'framer-motion'
import { useState } from 'react'
const Videos = ({ data }: { data: any }) => {
   const [isExpanded, setIsExpanded] = useState(false)
   const episodes = data.data.episodes

   return (
      <div className="container mx-auto pb-10">
         <h1 className="text-2xl font-semibold my-3">Episodes</h1>
         <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : '500px' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-hidden">
            {episodes.map((episode: any) => (
               <VideoCard key={episode.mal_id} data={episode} />
            ))}
         </motion.div>
         <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant={isExpanded ? 'outline' : 'default'}
            className=" text-sm font-semibold mt-2 hover:underline focus:outline-none block my-5 mx-auto">
            {isExpanded ? 'Show Less' : 'Show More'}
         </Button>
      </div>
   )
}

export default Videos
