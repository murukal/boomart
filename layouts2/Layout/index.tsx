// mui
import { Box } from '@mui/material'
// project
import Header from '../Header'
import type { Props } from './assets'

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <Box>{props.children}</Box>
    </>
  )
}

export default Layout
