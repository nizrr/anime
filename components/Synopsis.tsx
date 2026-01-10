'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface SynopsisProps {
   text: string
}

export function Synopsis({ text }: SynopsisProps) {
   const [isExpanded, setIsExpanded] = useState(false)

   if (!text) return null

   return (
      <div className="mt-4">
         <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : '4.9rem' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className={`overflow-hidden relative ${
               !isExpanded ? 'mask-[linear-gradient(to_bottom,black_50%,transparent)]' : ''
            }`}>
            <p className="text-slate-300 leading-relaxed">{text}</p>
         </motion.div>
         <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-400 text-sm font-semibold mt-2 hover:underline focus:outline-none block">
            {isExpanded ? 'Show Less' : 'Read More'}
         </button>
      </div>
   )
}
