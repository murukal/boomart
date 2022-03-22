// project
import { gql, TypedDocumentNode } from '@apollo/client'
import requests, { fetcher, FetchParams } from '.'
import { PaginateOutput, QueryParams } from '../typings/api'
import type { Essay } from '../typings/essay'

/** 查询最近的4篇文章 */
export const getLatest = async (page: number = 1) => {
  return await requests.get<PaginateResult<Essay>>('/api/essay', {
    params: {
      pagination: {
        limit: 4,
        page
      },
      populate: ['tags', 'createdBy']
    }
  })
}

/** 查询对应tag的文章列表 */
export const getTagEssays = (tagId: string, page: number = 1) =>
  requests.get<PaginateResult<Essay>>('/api/essay', {
    params: {
      pagination: {
        limit: 10,
        page
      },
      populate: ['tags', 'createdBy'],
      tags: tagId
    }
  })

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
 * 分页
 * 每页4篇
 */
export const ESSAYS: TypedDocumentNode<
  {
    essays: PaginateOutput<Essay>
  },
  QueryParams
> = gql`
  query Essays($paginateInput: PaginateInput) {
    essays(paginateInput: $paginateInput) {
      items {
        id
      }
    }
  }
`
