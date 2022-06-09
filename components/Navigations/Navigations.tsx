// mui
import { Grid, Pagination, Paper, Typography } from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
// project
import type { Props } from '.'

const Navigations = (props: Props) => {
  const [navigations, setNavigations] = useState(props.navigations)
  const [pageCount, setPageCount] = useState(props.pageCount)

  useEffect(() => {
    setNavigations(props.navigations)
    setPageCount(props.pageCount)
  }, [props])

  /**
   * 翻页
   */
  const onPage = () => {}

  return (
    <>
      <Grid
        container
        spacing={12}
        className={props.className}
        style={{
          ...props.style,
          marginBottom: 56
        }}
      >
        {navigations.map((navigation) => {
          // 背景图：取导航封面
          // 没有取到导航封面，获取第一个标签的图片
          const cover = navigation.cover || navigation.tags.at(0)?.image

          return (
            <Grid key={navigation.id} item container xs={4} justifyContent='center'>
              <Paper
                elevation={2}
                sx={{
                  ...(cover && {
                    backgroundImage: `url(${cover})`
                  }),
                  width: 250,
                  height: 120,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  backgroundSize: '100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  ':hover': {
                    backgroundSize: '101%',
                    boxShadow:
                      '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)'
                  }
                }}
              >
                <Paper
                  className='relative'
                  sx={{
                    width: 180,
                    height: 60,
                    transform: 'translate(35px, 90px)',
                    transition: 'all 0.3s ease',
                    boxShadow: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  <Typography>{navigation.title}</Typography>
                </Paper>
              </Paper>
            </Grid>
          )
        })}
      </Grid>

      <Pagination count={pageCount} color='primary' onChange={onPage} />
    </>
  )
}

export default Navigations
