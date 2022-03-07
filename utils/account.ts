// next
import { getSession } from 'next-auth/react'
// third
import type { IncomingMessage } from 'http'

/** 获取next-auth中的jwt token */
export const useAuthentication = async (req?: IncomingMessage) => {
  const session = await getSession({ req })

  // session中包含token
  console.log('user=====', session?.user)
}
