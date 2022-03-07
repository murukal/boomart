// next
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// project
import { getUser, login } from '../../../apis/account'
import type { Login, User } from '../../../typings/user'

export default NextAuth({
  providers: [
    CredentialsProvider({
      // 表单名
      name: 'Loacl',

      // 用于next-auth自动生成表单，其他场景无用
      credentials: {},

      // 验证逻辑
      async authorize(credentials) {
        // 验证账号密码
        const { data: token } = await login(credentials as Login)

        // 利用返回的token获取用户信息
        const { data: user } = await getUser({
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        return {
          ...user,
          token
        }
      }
    })
  ],

  callbacks: {
    signIn: async ({ user, credentials }) => {
      console.log('user===', user)

      return true
    },

    redirect({ url, baseUrl }) {
      console.log('url=====', url)
      console.log('url=====', baseUrl)

      return url
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      return {
        name: '1232131'
      }
    }
  },

  pages: {
    signIn: '/account/login'
  }
})
