// react
import { useMemo } from 'react'
// nextjs
import { useRouter } from 'next/router'
// mui
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
// project
import Tags from '../Tags'
import Signature from '../Signature'
import type { Props } from './assets'

const Wrapper = (props: Props) => {
  const router = useRouter()
  const essay = useMemo(() => props.essay, [props.essay])
  const tags = useMemo(() => props.essay.tags, [props.essay])

  /** 默认卡片大小 */
  const type = useMemo(() => props.type || 'horizontal', [props.type])

  /** 路由跳转 */
  const onGo2Essay = (id: number) => () => {
    router.push(`/essay/${id}`)
  }

  /** 根据 type 生成卡片的style */
  const styles = useMemo(() => {
    return {
      cardStyles: {
        className: type === 'horizontal' ? 'flex bg-gray-50 mt-7' : undefined,
        elevation: type === 'horizontal' ? 0 : undefined
      },
      coverStyles: {
        className: `cursor-pointer ${type === 'horizontal' ? 'rounded-r' : ''}`,
        height: type === 'horizontal' ? 150 : 200,
        style: type === 'horizontal' ? { flex: 1 } : undefined
      },
      contentStyles: {
        className: type === 'horizontal' ? 'px-4 self-center' : 'p-7',
        style: type === 'horizontal' ? { flex: 2 } : undefined
      }
    }
  }, [type])

  return (
    <Card className={styles.cardStyles.className} key={essay.id} elevation={styles.cardStyles.elevation}>
      <CardMedia
        className={styles.coverStyles.className}
        style={styles.coverStyles.style}
        height={styles.coverStyles.height}
        component='img'
        image={essay.cover || tags.at(0)?.image}
        alt={essay.title}
        onClick={onGo2Essay(essay.id)}
      />
      <CardContent className={styles.contentStyles.className} style={styles.contentStyles.style}>
        <Tags className='mb-3' tags={tags} />

        {/* 文章标题 */}
        <Typography className='cursor-pointer' variant='h5' onClick={onGo2Essay(essay.id)}>
          {essay.title}
        </Typography>

        {/* 文章署名 */}
        <Signature className='mt-5' essay={essay} />
      </CardContent>
    </Card>
  )
}

export default Wrapper
