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
         {
            protocol: 'https',
            hostname: 'img1.ak.crunchyroll.com',
            port: '',
            pathname: '/**',
            search: '',
         },
      ],
   },
   /* config options here */
}

export default nextConfig
