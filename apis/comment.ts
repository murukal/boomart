import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'
import { Comment, CreateCommentInput, FilterInput } from '../typings/comment'

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

/**
 * 查询多个评论
 */
export const COMMENTS: TypedDocumentNode<
  {
    comments: Comment[]
  },
  {
    filterInput: FilterInput
  }
> = gql`
  query Comments($filterInput: FilterCommentInput!) {
    comments(filterInput: $filterInput) {
      id
      content
      createdBy {
        username
        avatar
      }
    }
  }
`
