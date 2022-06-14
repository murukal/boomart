// next
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
// mui
import { ThemeProvider } from '@mui/material'
// third
import { CacheProvider } from '@emotion/react'
import { ApolloProvider } from '@apollo/client'
import '@fontsource/noto-sans-sc'
import '@fontsource/noto-sans-sc/500.css'
import '@fontsource/noto-sans-sc/700.css'
import '@fontsource/noto-sans-sc/900.css'
// project
import { createEmotionCache } from '~/utils/ui'
import theme from '~/theme'
import Layout from '~/layouts/Layout/Layout'
import fantufantuUrl from '~/public/fantufantu.png'
import client from '~/apis'
// styles
import '../styles/index.css'
import '@fantufantu/beeeditor/compile/main.css'

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  const emotionCache = createEmotionCache()

  /** createElement */
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <Head>
              <title>番土番土</title>
              <link rel='icon' href={fantufantuUrl.src} />
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default App
