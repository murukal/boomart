export enum Type {
  browse = 'browse',
  like = 'like',
  collect = 'collect'
}

export enum TargetType {
  essay = 'essay'
}

export interface TopInput {
  type: Type
  limit: number
  targetType: TargetType
  from: Date
  to: Date
}
