export interface UrlReactionApiModelTypes {
  id: number
  attributes?: Record<string, any>
  createdAt: Date | string
  updatedAt?: Date | string
  type: string
  url?: Object
}

export interface UrlReactionTypes {
  id: number
  createdAt: Date | string
  updatedAt?: Date | string
  type: string
  url?: Object
}
