// next
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// project
import { login } from '../../../apis/account'
import type { Login } from '../../../typings/user'

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
        // const { data: user } = await ar.get<User>('/api/authentication', {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // })

        return {
          // ...user,
          token
        }
      }
    })
  ],

  callbacks: {
    signIn: async ({ user, credentials }) => {
      return true
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
