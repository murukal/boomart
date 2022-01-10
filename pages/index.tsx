// next
import type { NextPage } from 'next'
import Head from 'next/head'
// mui
import { ThemeProvider } from '@mui/material'
// project
import Layout from '../layouts/Layout'
import { theme } from '../theme'

const Home: NextPage = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Boom!Boom!</title>
        </Head>
        <Layout />
      </ThemeProvider>
    </>
  )
}

export default Home
