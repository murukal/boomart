import { gql, TypedDocumentNode } from '@apollo/client'
import dayjs from 'dayjs'
import { fetcher } from '.'
import { TargetType, TopInput, Type } from '../typings/toggle'

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
