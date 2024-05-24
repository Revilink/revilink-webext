import { encodeBase64 } from '../../utils/encode-decode'
import { convertToRevilinkFormat } from '../../utils/url'
import type { FetchReviewsTypes, FetchUrlReactionsTypes, UseApiTypes } from './use-api.composable.types'
import { API_URL } from '~/system/constants'
import type { ReviewApiModelTypes, UrlReactionApiModelTypes } from '~/types'
import { reviewTransformer, urlReactionTransformer } from '~/transformers'

export default (): UseApiTypes => {
  const fetchReviews: FetchReviewsTypes = async (params) => {
    const { url, limit = 2 } = params

    try {
      const encodedUrl = encodeBase64(convertToRevilinkFormat({ url }))
      const response = await fetch(`
        ${API_URL}/comments?populate=url,user,user.avatar,images&filters[url][url][$eq]=${encodedUrl}&filters[parent][id][$notNull]=false&sort=id:desc&pagination[page]=1&pagination[pageSize]=${limit}
      `)

      if (!response.ok)
        throw new Error('Network response was not ok')

      const { data, meta }: any = await response.json()

      return <any>{
        data: data.map((item: ReviewApiModelTypes) => reviewTransformer(item)),
        meta,
      }
    }
    catch (error) {
      console.error('Failed to fetch data from API', error)
      return undefined
    }
  }

  const fetchUrlReactions: FetchUrlReactionsTypes = async (params) => {
    const { url } = params

    try {
      const encodedUrl = encodeBase64(convertToRevilinkFormat({ url }))
      const response = await fetch(`
        ${API_URL}/url-reactions?populate=&filters[url][url][$eq]=${encodedUrl}
      `)

      if (!response.ok)
        throw new Error('Network response was not ok')

      const { data, meta }: any = await response.json()

      return <any>{
        data: data.map((item: UrlReactionApiModelTypes) => urlReactionTransformer(item)),
        meta,
      }
    }
    catch (error) {
      console.error('Failed to fetch data from API', error)
      return undefined
    }
  }

  return {
    fetchReviews,
    fetchUrlReactions,
  }
}
