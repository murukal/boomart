// antd
import { TablePaginationConfig } from 'antd'
// npm
export { PaginateOptions, PaginateResult } from 'mongoose'

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T | null
}

/**
 * QueryOptions 在发起API请求时，转换给后端的请求参数
 */
export interface QueryOptions<RecordType = any> {
  pagination?: PaginateOptions
  sorter?: SorterResult<RecordType> | SorterResult<RecordType>[]
  [key: string]: any
}

/**
 * GET的请求函数
 */
export type FetchAPI<T> = (queryOptions: QueryOptions) => Promise<ApiResponse<PaginateResult<T> | T[] | null>>
