// project
import type { Essay } from '../../../typings/essay'

export { default } from './Hot'

export interface Props {
  className?: string

  browseTopEssays: Essay[] | null
  likeTopEssays: Essay[] | null
}
