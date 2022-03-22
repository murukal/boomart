// next
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// third
import { JwtPayload, sign, verify } from 'jsonwebtoken'
// project
import { login, whoAmI } from '../../../apis/auth'
import { getJwtSecret } from '../../../apis'
import type { LoginInput, User } from '../../../typings/auth'

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

        // 用于next-auth自动生成表单，其他场景无用
        credentials: {},

        // 验证逻辑
        async authorize(credentials) {
          // 账号密码登录
          const result = await login(credentials as LoginInput)

          console.log('result===')

          // 成功获取到token后，获取用户信息
          const { data } = await whoAmI()

          return {
            id: data?.whoAmI.id,
            name: data?.whoAmI.username,
            email: data?.whoAmI.email,
            image: data?.whoAmI.avatar
          }
        }
      })
    ],

    secret: jwtSecret,

    callbacks: {
      /** 登录后的回调 */
      signIn: async () => {
        return true
      },

      /** session 回调 内的数据来源于 jwt 回调 */
      jwt: async ({ token }) => {
        return token
      },

      /** 生成用户会话 */
      session: async ({ session }) => {
        return session
      }
    },

    jwt: {
      encode: async ({ token, secret }) => {
        return sign(
          {
            id: token?.sub
          },
          secret
        )
      },

      decode: async ({ token, secret }) => {
        if (!token) return null

        const payload = verify(token, secret) as JwtPayload

        // 返回token payload
        return {
          sub: payload.id
        }
      }
    },

    pages: {
      signIn: '/account/login'
    }
  })
}
