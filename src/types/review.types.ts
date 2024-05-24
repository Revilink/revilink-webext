import type { UserApiModelTypes, UserTypes } from './user.types'

export interface ReviewApiModelTypes {
  id: number
  attributes?: Record<string, any>
  createdAt: string
  updatedAt?: string
  url: Object
  user: UserApiModelTypes
  comment: string
  parent?: Object
  likeCount: number
  myLike?: Object
  replyCount: number
}

export interface ReviewTypes {
  id: number
  createdAt: string
  updatedAt?: string
  url: Object
  user: UserTypes
  content: string
  parent?: Object
  likeCount: number
  myLike?: Object
  replyCount: number
}
