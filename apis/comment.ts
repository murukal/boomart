import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'
import { CreateCommentInput } from '../typings/comment'

/**
 * 创建toggle
 */
const CREATE: TypedDocumentNode<
  { createComment: boolean },
  {
    createCommentInput: CreateCommentInput
  }
> = gql`
  mutation CreateComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput)
  }
`

export const create = (createCommentInput: CreateCommentInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createCommentInput
    }
  })
