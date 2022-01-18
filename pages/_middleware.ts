import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest, event: NextFetchEvent) => {
  console.log('request=====', request.page)
  console.log('requestdddd=====', request.nextUrl)

  const pageName = request.page.name
  const search = request.nextUrl.search

  // 页面跳转
  if (pageName && search) {
    const searchParams = request.nextUrl.searchParams

    // 单点登录
    const token = searchParams.get('token')

    if (token) {
      const isOnce = new Boolean(searchParams.get('is_once'))
    }
  }

  return NextResponse.next()
}
