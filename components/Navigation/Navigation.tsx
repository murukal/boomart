// react
import { createRef, useMemo, useState, useEffect } from 'react'
// mui
import { Paper, Typography } from '@mui/material'
// project
import TagChips from '~/layouts/Footer/TagChips'
import styles from './Navigation.module.css'
import type { Props } from '.'

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

  /**
   * 跳转外链
   */
  const onClick = () => {
    window.open(navigation.link, '_blank')
  }

  return (
    <>
      <Paper
        ref={backgroudRef}
        elevation={elevation}
        sx={backgroudStyle}
        className={backgroudClassName}
        onClick={onClick}
      >
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
        onClick={onClick}
      >
        <Typography fontWeight={700} gutterBottom>
          {navigation.title}
        </Typography>
        <Typography>{navigation.subtitle}</Typography>
      </Paper>
    </>
  )
}

export default Navigation
