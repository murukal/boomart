// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
// mui
import { Pagination, Container } from '@mui/material'
// project
import Wrapper from '../../components/Essay/Wrapper'
import { getEssays } from '../../apis/essay'
import type { Essay } from '../../typings/essay'

interface Props {
  essays: Essay[]
  totalPages: number
}

const Category = (props: Props) => {
  const [totalPages, setTotalPages] = useState(props.totalPages)

  const router = useRouter()

  return (
    <Container>
      {props.essays.map((essay) => (
        <Wrapper key={essay._id} essay={essay} />
      ))}

      <Pagination className='mt-7' count={totalPages} color='primary' />
    </Container>
  )
}

export default Category

/** 服务端渲染 */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // 请求成功
  return {
    props: {
      essays: [],
      totalPages: 0
    }
  }
}
