// third
import { Button, Container } from '@mui/material'
import { useState } from 'react'
import ReactPlayer from 'react-player'

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const onReady = () => {
    setIsPlaying(true)
  }

  const onStop = () => {
    setIsPlaying(false)
  }

  return (
    <Container>
      <ReactPlayer
        style={{
          marginBottom: '3rem',
          marginTop: '3rem'
        }}
        loop={true}
        url='https://boomemory-1304340057.cos.ap-shanghai.myqcloud.com/2022-03-30%2021-28-37.mkv'
        playing={isPlaying}
      />

      <Button onClick={onReady}>play</Button>

      <Button onClick={onStop}>stop</Button>
    </Container>
  )
}

export default Player
