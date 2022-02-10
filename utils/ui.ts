// react
import type { RefObject } from 'react'
// third
import createCache from '@emotion/cache'

// mui 给出的 css 集成方案
export const createEmotionCache = () => createCache({ key: 'css', prepend: true })

// 自动打字的ui效果
export const setTypedUI = (ref: RefObject<HTMLSpanElement>) => {
  const contents = ['这里有一些技术分享。', '不乏总结下来的编程导航。', '也有生活中的一点乐趣。']
  let contentIndex: number = 0
  let charIndex: number = 0
  let displayType: 'typed' | 'remove' = 'typed'
  let interval: NodeJS.Timer
  let timeout: NodeJS.Timeout

  const handler = () => {
    if (!ref.current) return

    const text = ref.current.innerText
    const length = text.length

    // 元素内的长度 大于等于 预设文案的长度，转为退格
    if (displayType === 'typed' && length >= contents[contentIndex].length) {
      displayType = 'remove'

      // 清楚原来的定时器，延时开启新的定时器
      clearInterval(interval)

      timeout = setTimeout(() => {
        interval = setInterval(handler, 200)
      }, 1000)

      return
    }

    // 元素内的长度为0时，转为打字
    if (displayType === 'remove' && length <= 0) {
      charIndex = 0
      contentIndex = contentIndex >= contents.length - 1 ? 0 : contentIndex + 1
      displayType = 'typed'
    }

    if (displayType === 'remove') {
      // 退格效果
      ref.current.innerText = text.slice(0, -1)
    } else {
      // 打字效果
      ref.current.innerText = text + contents[contentIndex].charAt(charIndex)
    }

    charIndex++
  }

  interval = setInterval(handler, 200)

  // 返回一个取消函数
  return () => {
    clearTimeout(timeout)
    clearInterval(interval)
  }
}
