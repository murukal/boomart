// next
// import Link from 'next/link'
// mui
import { Box, Drawer, Typography, Link } from '@mui/material'
// third
import { useQuery } from '@apollo/client'
// project
import styles from '~/layouts/Layout/Layout.module.css'
import { TopTags } from '~/apis/tag'
import type { Props } from '.'

const RightDrawer = (props: Props) => {
  /** 查询榜单标签 */
  const { data } = useQuery(TopTags)

  return (
    <Drawer
      anchor='right'
      open={props.isOpened}
      onClose={props.onClose}
      PaperProps={{
        style: {
          width: '20rem',
          padding: '2rem'
        }
      }}
    >
      <Box className='my-8'>
        <Typography className={styles['plate-title']}>HOT TAGS</Typography>
        <ul
          style={{
            padding: 0,
            margin: 0
          }}
        >
          {data?.topTags.map((tag, index) => (
            <li
              key={tag.id}
              style={{
                padding: '8px 0',
                display: 'flex',
                borderBottom: index + 1 !== data?.topTags.length ? '1px dotted rgba(0, 0, 0, 0.15)' : undefined
              }}
            >
              <Link href={`/category/${tag.id}`} underline='none'>
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.muted?.main,
                    ':hover': {
                      color: theme.palette.primary.main
                    }
                  })}
                >
                  {tag.name}
                </Typography>
              </Link>

              <Typography
                sx={(theme) => ({
                  marginLeft: 'auto',
                  background: theme.palette.muted?.main,
                  width: '24px',
                  height: '24px',
                  textAlign: 'center',
                  borderRadius: '50%'
                })}
                fontSize='12px'
                lineHeight='24px'
                component='span'
                color='white'
              >
                {tag.creationCount}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>

      <Box className='mb-8'>
        <Typography className={styles['plate-title']}>不可错过</Typography>
      </Box>

      <Box className='mb-8'>
        <Typography className={styles['plate-title']}>广告位招租</Typography>
      </Box>
    </Drawer>
  )
}

export default RightDrawer
