// third
import dayjs from 'dayjs'
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { TopInput } from '../typings/toggle'

export enum Type {
  browse = 'browse',
  like = 'like',
  collect = 'collect'
}

export enum TargetType {
  essay = 'essay'
}

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
