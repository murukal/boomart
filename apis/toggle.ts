// third
import dayjs from 'dayjs'
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { CreateToggleInput, RemoveToggleInput, TopInput } from '../typings/toggle'
import type { Essay } from '../typings/essay'

export enum Type {
  Browse = 'Browse',
  Like = 'Like',
  Collect = 'Collect'
}

export enum TargetType {
  Essay = 'Essay'
}

/**
 * 查询榜单文章ids
 */
const TOP_ESSAYS: TypedDocumentNode<
  {
    topEssays: Essay[]
  },
  {
    topInput: TopInput
  }
> = gql`
  query TopEssays($topInput: TopInput!) {
    topEssays(topInput: $topInput) {
      id
      title
      cover
      tags {
        id
        name
        image
      }
      createdBy {
        username
      }
    }
  }
`

export const getTopEssays = (type: Type, from?: dayjs.Dayjs) => {
  const to = dayjs()
  const actualFrom = from || to.subtract(1, 'M')

  return fetcher.query({
    query: TOP_ESSAYS,
    variables: {
      topInput: {
        from: actualFrom.toDate(),
        to: to.toDate(),
        limit: 4,
        type
      }
    }
  })
}

/**
 * 创建toggle
 */
const CREATE: TypedDocumentNode<
  { createToggle: boolean },
  {
    createToggleInput: CreateToggleInput
  }
> = gql`
  mutation CreateToggle($createToggleInput: CreateToggleInput!) {
    createToggle(createToggleInput: $createToggleInput)
  }
`

export const create = (createToggleInput: CreateToggleInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createToggleInput
    }
  })

/**
 * 删除toggle
 */
const REMOVE: TypedDocumentNode<
  { removeToggle: boolean },
  {
    removeToggleInput: RemoveToggleInput
  }
> = gql`
  mutation RemoveToggle($removeToggleInput: RemoveToggleInput!) {
    removeToggle(removeToggleInput: $removeToggleInput)
  }
`

export const remove = (removeToggleInput: RemoveToggleInput) =>
  fetcher.mutate({
    mutation: REMOVE,
    variables: {
      removeToggleInput
    }
  })
