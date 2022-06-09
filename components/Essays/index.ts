import { Essay } from '~/typings/essay'

export { default } from './Essays'

export interface Props {
  essays: Essay[]
  pageCount: number
  tagIds?: number[]
}
