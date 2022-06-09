import { Pagination } from '@mui/material'
import { ChangeEvent, useState, useEffect } from 'react'
import { getEssays } from '~/apis/essay'
import { Props } from '.'
import Wrapper from '../Essay/Wrapper'

const Essays = (props: Props) => {
  const [essays, setEssays] = useState(props.essays)
  const [pageCount, setPageCount] = useState(props.pageCount)

  useEffect(() => {
    setEssays(props.essays)
    setPageCount(props.pageCount)
  }, [props])

  /**
   * 文章分页发生变更的回调事件
   * 重新获取文章列表
   */
  const onPage = async (e: ChangeEvent<unknown>, page: number) => {
    const result = await getEssays({
      filterInput: {
        tagIds: props.tagIds
      },
      paginateInput: {
        page,
        limit: 5
      }
    })

    setEssays(result.data?.essays.items || [])
    setPageCount(result.data?.essays.pageCount || 0)
  }

  return (
    <>
      {essays.map((essay) => (
        <Wrapper key={essay.id} essay={essay} className='mb-7' />
      ))}
      <Pagination count={pageCount} className='mb-7' color='primary' onChange={onPage} />
    </>
  )
}

export default Essays
