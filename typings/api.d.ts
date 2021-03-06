/**
 * 分页返回
 */
export interface PaginateOutput<T> {
  items?: T[]
  page?: number
  limit?: number
  pageCount?: number
  totalCount?: number
}

/**
 * 分页参数
 */
export interface PaginateInput {
  page?: number
  limit: number
}

/**
 * 查询的通用参数
 */
export interface QueryParams<F = Record<string, any>> {
  paginateInput?: PaginateInput
  filterInput?: F
}
