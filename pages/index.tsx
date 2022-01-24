// next
import type { NextPage } from 'next'
// project
import Publish from '../components/Charts/Publish'

const Home: NextPage = () => {
  return (
    <>
      <Publish />
    </>
  )
}

export default Home

export const getServerSideProps = () => {
  // 请求后端数据
  return { props: {} }
}
