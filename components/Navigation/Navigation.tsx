import { Paper, Typography } from '@mui/material'
import { createRef, useMemo, useState, useEffect } from 'react'
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
   * 背景块 className
   */
  const backgroudClassName = useMemo(() => {
    const classNames = [styles.backgroud]

    if (isHovered) {
      classNames.push(styles['backgroud-hovered'])
    }

    return classNames.join(' ')
  }, [isHovered])

  return (
    <>
      <Paper ref={backgroudRef} elevation={elevation} sx={backgroudStyle} className={backgroudClassName} />

      <Paper ref={profileRef} className={styles.profile + ' relative'} elevation={elevation}>
        <Typography>{navigation.title}</Typography>
      </Paper>
    </>
  )
}

export default Navigation
