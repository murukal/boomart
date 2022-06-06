// project
import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'
import { PaginateInput, PaginateOutput, QueryParams } from '../typings/api'
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
      tags {
        id
        name
        image
      }
      createdBy {
        id
        username
        avatar
        creationCount
      }
      title
      content
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
 * 查询文章状态
 */
export const ESSAY_TOGGLE: TypedDocumentNode<
  {
    essay: Essay
  },
  {
    id: number
  }
> = gql`
  query Essay($id: Int!) {
    essay(id: $id) {
      isLiked
      isCollected
    }
  }
`

/**
 * 查询多个文章
 */
export const ESSAYS: TypedDocumentNode<
  {
    essays: PaginateOutput<Essay>
  },
  QueryParams<FilterInput>
> = gql`
  query Essays($paginateInput: PaginateInput, $filterInput: FilterEssayInput) {
    essays(paginateInput: $paginateInput, filterInput: $filterInput) {
      items {
        id
        title
        cover
        tags {
          id
          name
          image
        }
        createdBy {
          id
          username
        }
      }
      pageCount
    }
  }
`

/**
 * 查询多个文章
 * 分页
 * 每页4篇
 */
export const getEssays = (
  filterInput?: FilterInput,
  paginateInput: PaginateInput = {
    page: 1,
    limit: 4
  }
) =>
  fetcher.query({
    query: ESSAYS,
    variables: {
      paginateInput,
      filterInput
    }
  })
