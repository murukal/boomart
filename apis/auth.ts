// third
import { gql, TypedDocumentNode } from '@apollo/client'
// project
import { AppID } from '~/assets'
import { fetcher } from '.'
import type { LoginInput, User } from '../typings/auth'

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
      email
      avatar
    }
  }
`

export const authorize = (loginInput: LoginInput) =>
  fetcher.mutate({
    mutation: AUTHORIZE,
    variables: {
      loginInput
    },
    context: {
      appId: AppID.Boomemory
    }
  })
