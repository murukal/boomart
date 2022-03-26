import { Core } from '.'

export interface FilterInput {
  parentId?: number
  tenantCode?: string
}

export interface Menu extends Core {
  name: string
  sortBy: number
  icon?: string
  tenantId?: number
  parentId?: number

  to?: string
  component?: string

  children?: Menu[]
}
