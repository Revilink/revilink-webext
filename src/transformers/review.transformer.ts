import type { ReviewApiModelTypes, ReviewTypes } from '~/types'
import { urlTransformer, userTransformer } from '~/transformers'

function baseTransformer(model: ReviewApiModelTypes) {
  return <ReviewTypes>{
    id: model.id,
    createdAt: model.attributes?.createdAt || model.createdAt,
    updatedAt: model.attributes?.updatedAt || model.updatedAt,
    url: model.attributes?.url || model.url ? urlTransformer(model.attributes?.url?.data || model.url) : null,
    user: model.attributes?.user || model.user ? userTransformer(model.attributes?.user.data || model.user) : null,
    content: model.attributes?.comment || model.comment,
    likeCount: model.attributes?.likeCount || model.likeCount,
    myLike: model.attributes?.myLike || model.myLike,
    replyCount: model.attributes?.replyCount || model.replyCount,
  }
}

export default (model: ReviewApiModelTypes) => {
  return <ReviewTypes>{
    ...baseTransformer(model),
    parent: model.attributes?.parent?.data || model.parent ? baseTransformer(model.attributes?.parent.data || model.parent) : null,
  }
}
