// router
import { useRouter } from 'next/router'
// mui
import { Chip } from '@mui/material'
// third
import { useQuery } from '@apollo/client'
// project
import { TAGS } from '~/apis/tag'

const TagChips = () => {
  const router = useRouter()

  const { data } = useQuery(TAGS)

  /** chip 点击事件 */
  const onChipClick = (id: number) => () => {
    router.push(`/category/${id}`)
  }

  return (
    <>
      {data?.tags.items?.map((tag) => (
        <Chip className='mr-1 mb-2' key={tag.id} label={tag.name} clickable onClick={onChipClick(tag.id)} />
      ))}
    </>
  )
}

export default TagChips
