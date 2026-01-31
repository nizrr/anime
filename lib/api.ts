const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.jikan.moe/v4'

export async function fetchApi<T>(url: string, query?: string): Promise<T> {
   const res = await fetch(`${BASE_URL}/${url}${query ? `?${query}` : ''}`, {
      next: { revalidate: 3600 },
   })

   if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
   }

   return res.json()
}

export const getTopAnime = async () => {
   const response = await fetchApi('top/anime')
   return response
}

export const getSeasonNowAnime = async (query?: string) => {
   const response = await fetchApi('seasons/now', query)
   return response
}

export const getUpcomingAnime = async (query?: string) => {
   const response = await fetchApi('seasons/upcoming', query)
   return response
}

export const getAnimeById = async (id: any) => {
   const response = await fetchApi(`anime/${id}`)
   return response
}

export const getVideosById = async (id: any) => {
   const response = await fetchApi(`anime/${id}/videos`)
   return response
}

export const getAnimeBySearch = async (
   query: string,
   limit?: number,
   orderBy?: string,
   sort?: string,
) => {
   // bagaimana jika banyak query? misal: &q=naruto&limit=10&order_by=popularity&sort=desc menggunakan dinamis
   const queryParams = new URLSearchParams()
   queryParams.set('q', query)
   queryParams.set('limit', limit?.toString() || '10')
   queryParams.set('order_by', orderBy || 'popularity')
   queryParams.set('sort', sort || 'desc')
   const response = await fetchApi(`anime`, queryParams.toString())
   return response
}
