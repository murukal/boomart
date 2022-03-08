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
          id: user?._id,
          name: user?.username,
          email: user?.email,
          image: user?.avatar,
          token
        }
      }
    })
  ],

  callbacks: {
    /** 登录后的回调 */
    signIn: async () => {
      return true
    },

    /** 传递jwt */
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token
      }
      return token
    },

    /** 将jwt中的token传递给session */
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  },

  pages: {
    signIn: '/account/login'
  }
})
