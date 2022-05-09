import { gql, TypedDocumentNode } from '@apollo/client'
import { PaginateOutput } from '../typings/api'
import { FilterInput, Menu } from '../typings/menu'

/**
 * 查询多个菜单
 */
export const MENUS: TypedDocumentNode<
  {
    menus: PaginateOutput<Menu>
  },
  {
    filterInput: FilterInput
  }
> = gql`
  query ($filterInput: FilterMenuInput!) {
    menus(filterInput: $filterInput) {
      items {
        id
        name
        sortBy
        icon
        to
        component
        parentId
      }
    }
  }
`
