const BASE_URL = process.env.PUBLIC_API_BASE_URL

const fetchApi = async (url: string) => {
   const baseUrl = BASE_URL?.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL

   try {
      const response = await fetch(`${baseUrl}/${url}`, { next: { revalidate: 3600 } })
      const data = await response.json()
      return data
   } catch (error) {
      console.log(error)
   }
}

export const getTopAnime = async () => {
   const response = await fetchApi('top/anime')
   return response
}
