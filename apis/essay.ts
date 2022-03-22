// project
import { gql, TypedDocumentNode } from '@apollo/client'
import requests, { fetcher } from '.'
import { PaginateOutput, QueryParams } from '../typings/api'
import type { Essay, FilterInput } from '../typings/essay'

/**
 * 查询单个文章
 */
const ESSAY: TypedDocumentNode<
  {
    essay: Essay
  },
  {
    id: number
  }
> = gql`
  query Essay($id: Int!) {
    essay(id: $id) {
      id
    }
  }
`

export const getEssay = (id: number) =>
  fetcher.query({
    query: ESSAY,
    variables: {
      id
    }
  })

/**
 * 查询多个文章
 */
export const ESSAYS: TypedDocumentNode<
  {
    essays: PaginateOutput<Essay>
  },
  QueryParams<FilterInput>
> = gql`
  query Essays($paginateInput: PaginateInput) {
    essays(paginateInput: $paginateInput) {
      items {
        id
      }
    }
  }
`

/**
 * 查询多个文章
 * 分页
 * 每页4篇
 */
export const getEssays = (page: number = 1, limit: number = 4, tagId?: number) =>
  fetcher.query({
    query: ESSAYS,
    variables: {
      paginateInput: {
        page,
        limit: 4
      },
      filterInput: {
        ...(tagId && {
          tagIds: [tagId]
        })
      }
    }
  })
