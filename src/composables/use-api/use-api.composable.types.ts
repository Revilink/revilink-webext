export interface UseApiTypes {
  fetchReviews: FetchReviewsTypes
  fetchUrlReactions: FetchUrlReactionsTypes
}

interface FetchReviewsParamsTypes {
  url: string
  limit?: number
}

interface FetchUrlReactionsParamsTypes {
  url: string
}

export type FetchReviewsTypes = (params: FetchReviewsParamsTypes) => Promise<any>
export type FetchUrlReactionsTypes = (params: FetchUrlReactionsParamsTypes) => Promise<any>
