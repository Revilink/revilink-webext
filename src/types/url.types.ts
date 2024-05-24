export interface ReactionCountTypes {
  heart?: number
  bookmark?: number
  smile?: number
  wow?: number
  thinking?: number
  angry?: number
}

export interface UrlApiModelTypes {
  id: number
  attributes?: Record<string, any>
  createdAt: Date | string
  updatedAt?: Date | string
  url: string
  urlRaw: string
  reactionCount?: ReactionCountTypes
  myReaction?: Object
}

export interface UrlTypes {
  id: number
  createdAt: Date | string
  updatedAt?: Date | string
  url: string
  urlRaw: string
  reactionCount?: ReactionCountTypes
  myReaction?: Object
}
