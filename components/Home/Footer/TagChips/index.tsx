// mui
import { Chip } from '@mui/material'
import { useEffect, useState } from 'react'
// project
import { getTags } from '../../../../apis/tag'
import type { Tag } from '../../../../typings/tag'

const TagChips = () => {
  const [tags, setTags] = useState<Tag[]>([])

  const onFetch = async () => {
    const res = await getTags()
    setTags(res.data?.docs || [])
  }

  useEffect(() => {
    onFetch()
  }, [])

  return (
    <>
      {tags.map((tag) => (
        <Chip className='mr-1 mb-2' key={tag._id} label={tag.name} />
      ))}
    </>
  )
}

export default TagChips
