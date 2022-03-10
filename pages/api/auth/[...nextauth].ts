// next
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// third
import { sign, decode } from 'jsonwebtoken'
// project
import { login } from '../../../apis/account'
import { getJwtSecret } from '../../../apis'
import type { Login, User } from '../../../typings/user'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // 获取后端中存在的秘钥
  const jwtSecret = (await getJwtSecret()).data

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
          const { data: token } = await login({
            data: credentials as Login
          })

          // token 解码 获取用户信息
          const payload = decode(token as string, { json: true })

          return {
            id: payload?._id,
            name: payload?.username,
            email: payload?.email,
            image: payload?.avatar
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
      encode: async ({ token, secret }) =>
        sign(
          {
            _id: token?.sub,
            username: token?.name,
            email: token?.email,
            avatar: token?.picture
          } as User,
          secret
        ),

      decode: async ({ token }) => {
        const payload = decode(token as string, {
          json: true
        })

        // 返回token payload
        return {
          sub: payload?._id,
          name: payload?.username,
          email: payload?.email,
          picture: payload?.avatar
        }
      }
    },

    pages: {
      signIn: '/account/login'
    }
  })
}
