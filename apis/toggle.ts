// third
import dayjs from 'dayjs'
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { CreateToggleInput, Toggle, TopInput } from '../typings/toggle'

export enum Type {
  browse = 'browse',
  like = 'like',
  collect = 'collect'
}

export enum TargetType {
  essay = 'essay'
}

/**
 * 查询榜单文章ids
 */
const TOP_ESSAY_IDS: TypedDocumentNode<
  {
    essayTopIds: number[]
  },
  {
    topInput: TopInput
  }
> = gql`
  query TopEssayIds($topInput: TopInput!) {
    topEssayIds(topInput: $topInput)
  }
`

export const getTopEssayIds = (type: Type) => {
  const to = dayjs()
  const from = to.subtract(1, 'M')

  return fetcher.query({
    query: TOP_ESSAY_IDS,
    variables: {
      topInput: {
        from: from.toDate(),
        to: to.toDate(),
        limit: 4,
        targetType: TargetType.essay,
        type
      }
    }
  })
}

/**
 * 创建toggle
 */
const CREATE: TypedDocumentNode<
  { createToggle: Toggle },
  {
    createToggleInput: CreateToggleInput
  }
> = gql`
  mutation CreateToggle($createToggleInput: CreateToggleInput!) {
    createToggle(createToggleInput: $createToggleInput) {
      id
    }
  }
`

export const create = (createToggleInput: CreateToggleInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createToggleInput
    }
  })
