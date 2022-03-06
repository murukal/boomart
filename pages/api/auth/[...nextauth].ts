// next
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '../../../typings/user'
// project
import ar from '../index'

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
        const { data: token } = await ar.post<string>('/api/authentication/login', {
          params: credentials
        })

        // 利用返回的token获取用户信息
        const { data: user } = await ar.get<User>('/api/authentication', {
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
      return true
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('token===', token)
      console.log('user====', user)

      return {
        name: '1232131'
      }
    }
  },

  pages: {
    signIn: '/account/login'
  }
})
