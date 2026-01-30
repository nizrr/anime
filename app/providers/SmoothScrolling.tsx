'use client'

import { ReactLenis } from 'lenis/react'

function SmoothScrolling({ children }: { children: React.ReactNode }) {
   // root: true memastikan lenis mengontrol scroll HTML utama
   // options: konfigurasi kehalusan scroll (lerp: 0.1 adalah default)
   return (
      <ReactLenis root options={{ lerp: 0.9, duration: 1.5 }}>
         {children}
      </ReactLenis>
   )
}

export default SmoothScrolling
