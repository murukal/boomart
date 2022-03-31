// react
import { useMemo } from 'react'
import type { CSSProperties } from 'react'
// nextjs
import { useRouter } from 'next/router'
// mui
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
// project
import Tags from '../Tags'
import Signature from '../Signature'
import type { Props } from '.'

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
      // 卡片外层样式
      cardStyles: {
        elevation: type === 'horizontal' ? 0 : undefined,
        style: {
          backgroundColor: props.color || 'rgb(249 250 251 / var(--tw-bg-opacity))',
          display: 'flex',
          flexDirection: 'column',
          ...(type === 'horizontal' && {
            marginTop: '1.75rem',
            flexDirection: 'row'
          }),
          ...(type === 'vertical' && {
            height: '100%',
            flexDirection: 'column'
          })
        } as CSSProperties
      },

      // 卡片封面图片样式
      coverStyles: {
        height: type === 'horizontal' ? 150 : 200,
        style: {
          cursor: 'pointer',
          ...(type === 'horizontal' && { flex: 0.5, borderRadius: '0.25rem' })
        } as CSSProperties
      },

      // 卡片内容样式
      contentStyles: {
        style: {
          flex: 1,
          ...(type === 'horizontal' && { padding: '1rem', alignSelf: 'center' }),
          ...(type === 'vertical' && { flex: 1, padding: '1.75rem', display: 'flex', flexDirection: 'column' })
        } as CSSProperties
      },

      // 卡片署名样式
      signatureStyle: {
        style: {
          ...(type === 'horizontal' && { marginTop: '1.25rem' }),
          ...(type === 'vertical' && { marginTop: 'auto' })
        } as CSSProperties
      }
    }
  }, [type])

  return (
    <Card key={essay.id} elevation={styles.cardStyles.elevation} style={styles.cardStyles.style}>
      <CardMedia
        style={styles.coverStyles.style}
        height={styles.coverStyles.height}
        component='img'
        image={essay.cover || tags.at(0)?.image}
        alt={essay.title}
        onClick={onGo2Essay(essay.id)}
      />
      <CardContent style={styles.contentStyles.style}>
        <Tags className='mb-3' tags={tags} />

        {/* 文章标题 */}
        <Typography className='cursor-pointer' variant='h5' onClick={onGo2Essay(essay.id)}>
          {essay.title}
        </Typography>

        {/* 文章署名 */}
        <Signature essay={essay} style={styles.signatureStyle.style} />
      </CardContent>
    </Card>
  )
}

export default Wrapper
