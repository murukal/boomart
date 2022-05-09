import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'
import { Comment, CreateCommentInput, FilterInput } from '../typings/comment'

/**
 * 创建评论
 */
const CREATE: TypedDocumentNode<
  { createComment: boolean },
  {
    createCommentInput: CreateCommentInput
  }
> = gql`
  mutation ($createCommentInput: CreateCommentInput!) {
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
  query ($filterInput: FilterCommentInput!) {
    comments(filterInput: $filterInput) {
      id
      content
      createdBy {
        isSelf
        username
        avatar
      }
      isDeleted
      createdAt
    }
  }
`

/**
 * 删除评论
 */
const Remove: TypedDocumentNode<
  {
    removeComment: boolean
  },
  {
    id: number
  }
> = gql`
  mutation ($id: Int!) {
    removeComment(id: $id)
  }
`

export const remove = (id: number) =>
  fetcher.mutate({
    mutation: Remove,
    variables: {
      id
    }
  })
