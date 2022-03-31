import { TargetType } from '../../../apis/toggle'

export { default } from './Comments'

export interface Props {
  className?: string
  targetId: number
  targetType: TargetType
}
