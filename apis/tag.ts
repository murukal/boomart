// third
import { gql, TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { PaginateOutput, QueryParams } from '../typings/api'
import type { Tag, TopTag } from '../typings/tag'

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
        name
      }
    }
  }
`

export const getTags = (query: QueryParams) =>
  fetcher.query({
    query: TAGS,
    variables: query
  })

/**
 * 查询标签排行榜
 */
export const TopTags: TypedDocumentNode<{
  topTags: TopTag[]
}> = gql`
  query TopTags {
    topTags {
      id
      name
      creationCount
    }
  }
`
