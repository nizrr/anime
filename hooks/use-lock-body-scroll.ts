import { useLayoutEffect } from 'react'

export function useLockBodyScroll(isLocked: boolean = true) {
   useLayoutEffect(() => {
      if (!isLocked) return

      // 1. Simpan overflow asli (jaga-jaga)
      const originalStyle = window.getComputedStyle(document.body).overflow

      // 2. Kunci body
      document.body.style.overflow = 'hidden'

      // 3. Bersihkan saat komponen di-unmount (search ditutup)
      return () => {
         document.body.style.overflow = originalStyle
      }
   }, [isLocked])
}
