import { Box, Drawer, Typography } from '@mui/material'
import { Props } from '.'
import styles from '~/layouts/Layout/Layout.module.css'
import { useQuery } from '@apollo/client'
import { TopTags } from '~/apis/tag'

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

        {data?.topTags.map((tag) => (
          <Box key={tag.id}>{tag.name}</Box>
        ))}
      </Box>

      <Box className='my-8'>
        <Typography className={styles['plate-title']}>不可错过</Typography>
      </Box>

      <Box className='my-8'>
        <Typography className={styles['plate-title']}>广告位招租</Typography>
      </Box>
    </Drawer>
  )
}

export default RightDrawer
