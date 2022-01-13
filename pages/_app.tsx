// next
import { AppProps } from 'next/app'
import Head from 'next/head'
// mui
import { ThemeProvider } from '@mui/material'
// project
import '../styles/index.css'
import { theme } from '../theme'
import Layout from '../layouts/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Boom!Boom!</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
