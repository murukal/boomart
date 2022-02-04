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
// project
import '../styles/index.css'
import theme from '../theme'
import Layout from '../layouts/Layout'
import { authenticate, passToken } from '../redux/userProfile/actions'
import store from '../redux'
import { storeQueryParams } from '../utils/app'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const redirect = useCallback(async () => {
    // query参数为空，不执行逻辑
    if (!Object.keys(router.query).length) return
    // 处理query && 路由重定向
    storeQueryParams(router.query) && router.replace(router.asPath.split('?')[0])
  }, [router.asPath])

  const onMounted = async () => {
    // 将客户端的token存储到redux中
    store.dispatch(passToken())
    // 鉴权
    store.dispatch(await authenticate())
  }

  // 应用监听路由变更
  useEffect(() => {
    redirect()
  }, [redirect])

  // 应用初次加载
  useEffect(() => {
    onMounted()
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Boom!Boom!</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default App
