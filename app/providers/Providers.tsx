'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  staleTime: 60 * 1000, // Data dianggap fresh selama 1 menit
                  retry: (failureCount: number, error: any) => {
                     // Stop retry jika sudah 2 kali gagal atau error statusnya 429
                     if (failureCount > 1) return false
                     return true
                  },
                  refetchOnWindowFocus: false, // Jangan fetch ulang saat tab browser diklik
               },
            },
         }),
   )

   return (
      <QueryClientProvider client={queryClient}>
         <NuqsAdapter>{children}</NuqsAdapter>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   )
}
