// third
import { gql, TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { PaginateOutput, QueryParams } from '~/typings/api'
import type { FilterInput, Navigation } from '~/typings/navigation'

const NAVIGATIONS: TypedDocumentNode<
  {
    navigations: PaginateOutput<Navigation>
  },
  QueryParams<FilterInput>
> = gql`
  query Navigations($paginateInput: PaginateInput, $filterInput: FilterNavigationInput) {
    navigations(paginateInput: $paginateInput, filterInput: $filterInput) {
      id
      title
      tags {
        id
        title
      }
    }
  }
`

export const getNavigations = (query?: QueryParams<FilterInput>) => {
  const { paginateInput, ...otherQuery } = query || {}

  return fetcher.query({
    query: NAVIGATIONS,
    variables: {
      ...otherQuery,
      paginateInput: {
        page: paginateInput?.page || 1,
        limit: paginateInput?.limit || 9
      }
    }
  })
}
