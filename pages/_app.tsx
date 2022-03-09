// next
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
// redux
import { Provider } from 'react-redux'
// mui
import { ThemeProvider } from '@mui/material'
// third
import { CacheProvider } from '@emotion/react'
import { SWRConfig } from 'swr'
// project
import { createEmotionCache } from '../utils/ui'
import theme from '../theme'
import Layout from '../layouts/Layout'
import store from '../redux'
import boomartUrl from '../public/boomart.ico'
import requests, { withAuthorization } from '../apis'
import type { FetchParams } from '../apis'
// styles
import '../styles/index.css'

const App = (props: AppProps) => {
  const {
    Component,
    pageProps: { session, fallback, ...pageProps }
  } = props

  console.log('fallback====', fallback)

  const emotionCache = createEmotionCache()

  /** 请求函数 */
  const fetcher = async (url: string, params: FetchParams, method?: keyof typeof requests) =>
    requests[method || 'get'](url, {
      ...params,
      headers: withAuthorization(session?.accessToken, params.headers)
    })

  /** createElement */
  return (
    <SWRConfig
      value={{
        fetcher,
        fallback
      }}
    >
      <CacheProvider value={emotionCache}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SessionProvider session={session}>
              <Head>
                <title>番土番土</title>
                <link rel='icon' href={boomartUrl.src} />
              </Head>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionProvider>
          </ThemeProvider>
        </Provider>
      </CacheProvider>
    </SWRConfig>
  )
}

export default App
