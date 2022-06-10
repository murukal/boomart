// react
import { ChangeEvent, useState, useEffect } from 'react'
// mui
import { Pagination } from '@mui/material'
// project
import { getEssays } from '~/apis/essay'
import Wrapper from '../Essay/Wrapper'
import type { Essay } from '~/typings/essay'
import type { Props } from '.'

const Essays = (props: Props) => {
  const [essays, setEssays] = useState<Essay[]>([])
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    setEssays(props.essays)
    setPageCount(props.pageCount)
  }, [props])

  /**
   * 翻页
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
      <Pagination count={pageCount} color='primary' onChange={onPage} />
    </>
  )
}

export default Essays
