// next
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <div>123123213</div>
    </>
  )
}

export default Home

export const getServerSideProps = () => {
  // 请求后端数据
  return { props: {} }
}
