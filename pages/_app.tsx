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
import { ApolloProvider } from '@apollo/client'
// project
import { createEmotionCache } from '~/utils/ui'
import theme from '~/theme'
import Layout from '~/layouts/Layout/Layout'
import store from '~/store'
import fantufantuUrl from '~/public/fantufantu.png'
import client from '~/apis'
// styles
import '../styles/index.css'

const App = (props: AppProps) => {
  const {
    Component,
    pageProps: { session, ...pageProps }
  } = props

  const emotionCache = createEmotionCache()

  /** createElement */
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <CacheProvider value={emotionCache}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Head>
                <title>番土番土</title>
                <link rel='icon' href={fantufantuUrl.src} />
              </Head>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </Provider>
        </CacheProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default App
