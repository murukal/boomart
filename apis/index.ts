// third
import {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  createHttpLink,
  FetchResult,
  gql,
  InMemoryCache,
  MutationOptions,
  NetworkStatus,
  OperationVariables,
  QueryOptions,
  TypedDocumentNode
} from '@apollo/client'
// project
import { GraphQLError } from 'graphql'

const link = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`,
  credentials: 'same-origin'
})

/**
 * 生成一个graphql请求客户端对象
 */
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

export default client

export const fetcher = {
  /** 查询 */
  query: <T = any, V = OperationVariables>(options: QueryOptions<V, T>) =>
    client.query<T, V>(options).catch(
      (error: ApolloError): ApolloQueryResult<null> => ({
        data: null,
        error,
        loading: false,
        networkStatus: NetworkStatus.error
      })
    ),

  /** 变更 */
  mutate: <T = any, V = OperationVariables>(options: MutationOptions<T, V>) =>
    client.mutate<T, V>(options).catch(
      (error: GraphQLError): FetchResult<T> => ({
        data: null,
        errors: [error]
      })
    )
}

/** 获取jwt秘钥 */
const JWT_SECRET: TypedDocumentNode<{
  jwtSecret: string
}> = gql`
  query {
    rsaPublicKey
  }
`

export const getJwtSecret = () =>
  fetcher.query({
    query: JWT_SECRET
  })
