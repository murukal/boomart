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
// styles
import '../styles/index.css'

const App = (props: AppProps) => {
  const {
    Component,
    pageProps: { session, fallback, ...pageProps }
  } = props

  const emotionCache = createEmotionCache()

  /** createElement */
  return (
    <SWRConfig
      value={{
        fallback
      }}
    >
      <SessionProvider session={session}>
        <CacheProvider value={emotionCache}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Head>
                <title>番土番土</title>
                <link rel='icon' href={boomartUrl.src} />
              </Head>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </Provider>
        </CacheProvider>
      </SessionProvider>
    </SWRConfig>
  )
}

export default App
