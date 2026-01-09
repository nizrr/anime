import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'cdn.myanimelist.net',
            port: '',
            pathname: '/**',
            search: '',
         },
      ],
   },
   /* config options here */
}

export default nextConfig
