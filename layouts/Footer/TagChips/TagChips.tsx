// react
import { useMemo, useEffect, useState, useCallback } from 'react'
// router
import { useRouter } from 'next/router'
// mui
import { Chip } from '@mui/material'
// project
import { getTags } from '~/apis/tag'
import type { Tag } from '~/typings/tag'
import type { Props } from '.'

const TagChips = (props: Props) => {
  const router = useRouter()
  const [tags, setTags] = useState<Tag[]>([])

  const onFetch = async () => {
    const result = await getTags({
      paginateInput: {
        page: 1,
        limit: 8
      }
    })

    setTags(result.data?.tags.items || [])
  }

  /**
   * 入参传入标签列表，直接展示
   * 入参未传入标签列表，查询数据库前8个
   */
  useEffect(() => {
    if (props.tags) {
      setTags(props.tags)
    } else {
      onFetch()
    }
  }, [])

  /**
   * chip 点击事件
   */
  const onChipClick = useCallback(
    (tagId: number) =>
      props.clickable
        ? () => {
            router.push(`/category/${tagId}`)
          }
        : undefined,
    [props.clickable]
  )

  return (
    <>
      {tags.map((tag) => (
        <Chip
          className='mr-1 mb-2'
          color={props.color}
          variant={props.variant}
          key={tag.id}
          label={tag.name}
          clickable={props.clickable}
          onClick={onChipClick(tag.id)}
        />
      ))}
    </>
  )
}

export default TagChips
