const BASE_URL = process.env.PUBLIC_API_BASE_URL

const fetchApi = async (url: string) => {
   try {
      const response = await fetch(`${BASE_URL}/${url}`, {
         next: { revalidate: 3600 },
      })
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

export const getSeasonNowAnime = async () => {
   const response = await fetchApi('seasons/now')
   return response
}
