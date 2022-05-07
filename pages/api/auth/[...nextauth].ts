// next
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// third
import { JwtPayload, sign, verify } from 'jsonwebtoken'
// project
import { login, WHO_AM_I } from '../../../apis/auth'
import { fetcher, getJwtSecret } from '../../../apis'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // 获取后端中存在的秘钥
  const jwtSecret = (await getJwtSecret()).data?.jwtSecret

  if (!jwtSecret) {
    res.status(500).send('JWT秘钥获取失败！')
    return
  }

  // 生成鉴权路由
  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        // 表单名
        name: 'Loacl',

        // ts 用途
        credentials: {
          keyword: { label: 'keyword', type: 'text' },
          password: { label: 'Password', type: 'password' }
        },

        // 验证逻辑
        async authorize(credentials) {
          // 没有认证信息
          if (!credentials) return null

          // 账号密码登录
          const result = await login({
            keyword: credentials?.keyword,
            password: credentials?.password
          })

          // 登录接口报错，返回异常
          if (!result.data?.login)
            return {
              error: 'login'
            }

          // 根据拿到的token，请求用户信息
          // 将token放到请求头里面
          const { data } = await fetcher.query({
            query: WHO_AM_I,
            context: {
              headers: {
                Authorization: `Bearer ${result.data?.login}`
              }
            },
            fetchPolicy: 'no-cache'
          })

          if (!data?.whoAmI) {
            return {
              error: 'whoAmI'
            }
          }

          return {
            // 用户信息
            id: data.whoAmI.id,
            name: data.whoAmI.username,
            email: data.whoAmI.email,
            image: data.whoAmI.avatar
          }
        }
      })
    ],

    secret: jwtSecret,

    callbacks: {
      /** 登录后的回调 */
      signIn: async ({ user }) => {
        // 存在异常码，重定向到登录页
        if (user.error) {
          return `/account/login?error=${user.error}`
        }

        return true
      },

      /** session 回调 内的数据来源于 jwt 回调 */
      jwt: async (params) => {
        return params.token
      },

      /** 生成用户会话 */
      session: async (params) => {
        return params.session
      },

      /** 回调url */
      redirect(params) {
        return params.url
      }
    },

    jwt: {
      encode: async (params) =>
        sign(
          {
            id: params.token?.sub,
            name: params.token?.name,
            email: params.token?.email,
            image: params.token?.picture
          },
          params.secret
        ),

      decode: async ({ token, secret }) => {
        if (!token) return null

        const payload = verify(token, secret) as JwtPayload

        // 返回token payload
        return {
          sub: payload.id,
          name: payload.name,
          email: payload.email,
          picture: payload.image
        }
      }
    },

    pages: {
      signIn: '/account/login'
    }
  })
}
