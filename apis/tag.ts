import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'
import { PaginateOutput, QueryParams } from '../typings/api'
import { Tag, TopTag } from '../typings/tag'

/**
 * 查询多个标签
 */
export const TAGS: TypedDocumentNode<
  {
    tags: PaginateOutput<Tag>
  },
  QueryParams
> = gql`
  query ($paginateInput: PaginateInput) {
    tags(paginateInput: $paginateInput) {
      items {
        id
        name
      }
    }
  }
`

/**
 * 查询标签排行榜
 */
export const TopTags: TypedDocumentNode<{
  topTags: TopTag[]
}> = gql`
  query {
    topTags {
      id
      name
      creationCount
    }
  }
`
