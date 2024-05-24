export interface AvatarTypes {
  id: number
  data?: Record<string, any>
  attributes?: Record<string, any>
  formats?: Record<string, any>
}

export interface UserInformationTypes {
  id?: number
  fullname?: string
  bio?: string
}

export interface UserApiModelTypes {
  id: number
  attributes?: Record<string, any>
  createdAt: Date | string
  updatedAt?: Date | string
  username: string
  email: string
  password: string
  avatar: AvatarTypes
  confirmed: boolean
  blocked: boolean
  provider: string
  information?: UserInformationTypes
}

export interface UserTypes {
  id: number
  createdAt: Date | string
  updatedAt?: Date | string
  email: string
  username: string
  password: string
  avatar: AvatarTypes
  confirmed: boolean
  blocked: boolean
  provider: string
  information?: UserInformationTypes
}
