// next
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// third
import { JwtPayload, sign, verify } from 'jsonwebtoken'
// project
import { authorize } from '../../../apis/auth'
import { getJwtSecret } from '../../../apis'

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

          // 认证账号密码
          const result = await authorize({
            keyword: credentials?.keyword,
            password: credentials?.password
          })

          const authorizedUser = result.data?.authorize

          if (authorizedUser) {
            // 用户信息
            return {
              id: authorizedUser.id,
              name: authorizedUser.username,
              email: authorizedUser.email,
              image: authorizedUser.avatar
            }
          } else {
            // 登录接口报错，返回异常
            return {
              error: 'authorize'
            }
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
      encode: async (params) => {
        // jwt secret 发生变更，用户信息被置空时，将现有token消除
        if (!params.token) return ''

        return sign(
          {
            id: params.token?.sub,
            name: params.token?.name,
            email: params.token?.email,
            image: params.token?.picture
          },
          params.secret
        )
      },

      decode: async ({ token, secret }) => {
        if (!token) return null

        try {
          const payload = verify(token, secret) as JwtPayload

          // 返回token payload
          return {
            sub: payload.id,
            name: payload.name,
            email: payload.email,
            picture: payload.image
          }
        } catch (error) {
          return null
        }
      }
    },

    pages: {
      signIn: '/account/login'
    }
  })
}
