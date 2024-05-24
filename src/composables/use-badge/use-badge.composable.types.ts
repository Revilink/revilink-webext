interface SetBadgeParamsTypes {
  text: string | null
  backgroundColor?: string
  textColor?: string
}

export type SetBadgeTypes = (params: SetBadgeParamsTypes) => void
