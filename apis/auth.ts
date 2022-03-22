import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'
import type { LoginInput, User } from '../typings/auth'

/**
 * 获取用户信息
 */
export const WHO_AM_I: TypedDocumentNode<{
  whoAmI: User
}> = gql`
  query {
    whoAmI {
      id
      username
      email
      avatar
    }
  }
`

/**
 * 登陆
 */
const LOGIN: TypedDocumentNode<
  {
    login: string
  },
  {
    loginInput: LoginInput
  }
> = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput)
  }
`

export const login = (loginInput: LoginInput) =>
  fetcher.mutate({
    mutation: LOGIN,
    variables: {
      loginInput
    }
  })
