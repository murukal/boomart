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
  mutation Create($createCommentInput: CreateCommentInput!) {
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
const REMOVE: TypedDocumentNode<
  {
    removeComment: boolean
  },
  {
    id: number
  }
> = gql`
  mutation Remove($id: Int!) {
    removeComment(id: $id)
  }
`

export const remove = (id: number) =>
  fetcher.mutate({
    mutation: REMOVE,
    variables: {
      id
    }
  })
