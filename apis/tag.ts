import { gql, TypedDocumentNode } from '@apollo/client'
import { PaginateOutput, QueryParams } from '../typings/api'
import { Tag } from '../typings/tag'

/**
 * 查询多个标签
 */
export const TAGS: TypedDocumentNode<
  {
    tags: PaginateOutput<Tag>
  },
  QueryParams
> = gql`
  query Tags($paginateInput: PaginateInput) {
    tags(paginateInput: $paginateInput) {
      items {
        id
        createdAt
        updatedAt
        name
        image
      }
      page
      limit
      total
      pageCount
    }
  }
`
