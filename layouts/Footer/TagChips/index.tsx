// mui
import { Chip } from '@mui/material'
import { useSelector } from 'react-redux'

const TagChips = () => {
  const tags = useSelector((state) => state.tags)

  return (
    <>
      {tags.map((tag) => (
        <Chip className='mr-1 mb-2' key={tag._id} label={tag.name} />
      ))}
    </>
  )
}

export default TagChips
