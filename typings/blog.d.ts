export interface Blog {
  _id: string
  title: string
  content: string
  createdBy: string | User
}

export interface PublishRecord {
  _id: number
  count: number
}
