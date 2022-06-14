// third
import { gql, TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { LoginInput } from '~/typings/auth'
import type { User } from '~/typings/user'

/**
 * 登陆
 */
const AUTHORIZE: TypedDocumentNode<
  {
    authorize: User
  },
  {
    loginInput: LoginInput
  }
> = gql`
  mutation Authorize($loginInput: LoginInput!) {
    authorize(loginInput: $loginInput) {
      id
      username
      emailAddress
      avatar
    }
  }
`

export const authorize = (loginInput: LoginInput) =>
  fetcher.mutate({
    mutation: AUTHORIZE,
    variables: {
      loginInput
    }
  })
