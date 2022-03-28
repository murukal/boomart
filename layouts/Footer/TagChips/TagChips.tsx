// router
import { useRouter } from 'next/router'
// redux
import { useSelector } from 'react-redux'
// mui
import { Chip } from '@mui/material'
// project
import type { State } from '../../../redux'
import type { Tag } from '../../../typings/tag'

const TagChips = () => {
  const tags = useSelector<State, Tag[]>((state) => state.tags)
  const router = useRouter()

  /** chip 点击事件 */
  const onChipClick = (id: number) => () => {
    router.push(`/category/${id}`)
  }

  return (
    <>
      {tags.map((tag) => (
        <Chip
          className='mr-1 mb-2 cursor-pointer'
          key={tag.id}
          label={tag.name}
          clickable
          onClick={onChipClick(tag.id)}
        />
      ))}
    </>
  )
}

export default TagChips
