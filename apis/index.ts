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
import type { GraphQLError } from 'graphql'
// project
import { AppID } from '~/assets'

const link = createHttpLink({
  // 动态获取url
  uri: (operation) => {
    // 根据请求客户端appId标识不同，获取不同的请求地址
    // 后端对不同的api进行了服务隔离
    const context = operation.getContext()
    const appId = context.appId

    // 返回指定的URL
    // 为了解决跨域不携带cookie问题，在nginx层做反向代理，前端请求同域地址
    return `${process.env.NEXT_PUBLIC_API_URL}/${appId || AppID.Boomart}/graphql`
  },

  // 携带cookie
  credentials: 'include'
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

/**
 * 获取jwt秘钥
 */
const JWT_SECRET: TypedDocumentNode<{
  jwtSecret: string
}> = gql`
  query JwtSecret {
    jwtSecret
  }
`

export const getJwtSecret = () =>
  fetcher.query({
    query: JWT_SECRET,
    fetchPolicy: 'no-cache',
    context: {
      appId: AppID.Boomemory
    }
  })
