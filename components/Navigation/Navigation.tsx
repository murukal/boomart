import { Paper, Typography } from '@mui/material'
import { createRef, useMemo, useState, useEffect } from 'react'
import TagChips from '~/layouts/Footer/TagChips'
import { Props } from '.'
import styles from './Navigation.module.css'

const Navigation = (props: Props) => {
  const backgroudRef = createRef<HTMLDivElement>()
  const profileRef = createRef<HTMLDivElement>()

  const navigation = useMemo(() => props.navigation, [props.navigation])
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    backgroudRef.current?.addEventListener('mouseenter', () => {
      setIsHovered(true)
    })

    backgroudRef.current?.addEventListener('mouseleave', () => {
      setIsHovered(false)
    })

    profileRef.current?.addEventListener('mouseenter', () => {
      setIsHovered(true)
    })

    profileRef.current?.addEventListener('mouseleave', () => {
      setIsHovered(false)
    })
  }, [backgroudRef])

  /**
   * 背景图：取导航封面
   * 没有取到导航封面，获取第一个标签的图片
   */
  const backgroudUrl = useMemo(() => navigation.cover || navigation.tags.at(0)?.image, [navigation])
  const backgroudStyle = useMemo(
    () => (backgroudUrl ? { backgroundImage: `url(${backgroudUrl})` } : {}),
    [backgroudUrl]
  )

  /**
   * 悬浮参数
   */
  const elevation = useMemo(() => (isHovered ? 6 : 2), [isHovered])

  /**
   * 背景块className
   */
  const backgroudClassName = useMemo(() => {
    const classNames = [styles.backgroud]

    if (isHovered) {
      classNames.push(styles['backgroud-hovered'])
    }

    return classNames.join(' ')
  }, [isHovered])

  /**
   * 详情块className
   */
  const profileClassName = useMemo(() => [styles.profile, 'relative'].join(' '), [])

  return (
    <>
      <Paper ref={backgroudRef} elevation={elevation} sx={backgroudStyle} className={backgroudClassName}>
        <TagChips tags={navigation.tags} color='warning' />
      </Paper>

      <Paper
        ref={profileRef}
        className={profileClassName}
        elevation={elevation}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography fontWeight={700} gutterBottom>
          {navigation.title}
        </Typography>
        <Typography>{navigation.title}</Typography>
      </Paper>
    </>
  )
}

export default Navigation
