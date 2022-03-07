// react
import { useCallback, useEffect } from 'react'
// next
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
// redux
import { Provider } from 'react-redux'
// mui
import { ThemeProvider } from '@mui/material'
// third
import { CacheProvider } from '@emotion/react'
// project
import { createEmotionCache } from '../utils/ui'
import theme from '../theme'
import Layout from '../layouts/Layout'
import store from '../redux'
import boomartUrl from '../public/boomart.ico'
// styles
import '../styles/index.css'

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  const emotionCache = createEmotionCache()

  return (
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
  )
}

export default App
