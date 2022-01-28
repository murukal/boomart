// next
import type { NextPage } from 'next'
import Image from 'next/image'
// project
import Publish from '../components/Charts/Publish'
import beianImage from '../public/beian.png'

const Home: NextPage = () => {
  return (
    <>
      <Publish />
      <div className='flex h-9 mt-1 items-center'>
        {/* 公安备案号 */}
        <div className='w-80 rounded-t-md'>
          <a target='_blank' rel='noreferrer' href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902003160' className='h-5'>
            <Image src={beianImage} alt='' />
            <span className='h-5 ml-1' style={{ color: '#939393' }}>
              浙公网安备 33010902003160号
            </span>
          </a>
        </div>
      </div>
    </>
  )
}

export default Home

export const getServerSideProps = () => {
  // 请求后端数据
  return { props: {} }
}
