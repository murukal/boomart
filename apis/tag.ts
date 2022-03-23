import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'
import { PaginateOutput, QueryParams } from '../typings/api'
import { Tag } from '../typings/tag'

/**
 * 查询多个标签
 */
const TAGS: TypedDocumentNode<
  {
    tags: PaginateOutput<Tag>
  },
  QueryParams
> = gql`
  query Tags($paginateInput: PaginateInput) {
    tags(paginateInput: $paginateInput) {
      items {
        id
        name
      }
    }
  }
`

export const getTags = () =>
  fetcher.query({
    query: TAGS
  })
