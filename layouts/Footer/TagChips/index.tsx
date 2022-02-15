// mui
import { Chip } from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const TagChips = () => {
  const tags = useSelector((state) => state.tags)
  const router = useRouter()

  /** chip 点击事件 */
  const onChipClick = (id: string) => () => {
    router.push(`/category/${id}`)
  }

  return (
    <>
      {tags.map((tag) => (
        <Chip className='mr-1 mb-2 cursor-pointer' key={tag._id} label={tag.name} clickable onClick={onChipClick(tag._id)} />
      ))}
    </>
  )
}

export default TagChips
