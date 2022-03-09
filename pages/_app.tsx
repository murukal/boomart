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
import { SWRConfig, unstable_serialize } from 'swr'
// project
import { createEmotionCache } from '../utils/ui'
import theme from '../theme'
import Layout from '../layouts/Layout'
import store from '../redux'
import boomartUrl from '../public/boomart.ico'
import requests, { withAuthorization, apis } from '../apis'
// styles
import '../styles/index.css'

const App = (props: AppProps) => {
  const {
    Component,
    pageProps: { session, fallback, ...pageProps }
  } = props

  const emotionCache = createEmotionCache()

  /** 请求函数 */
  function fetcher() {
    const params = Array.from(arguments)
    return apis[unstable_serialize(params)].apply(undefined, params as any)
  }

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
