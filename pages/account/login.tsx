// react
import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
// mui
import { Container, Box, Paper, TextField, Typography, Grid, Button } from '@mui/material'

const Login = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    keyword: false,
    password: false
  })

  useEffect(() => {
    if (router.query.error) {
      setErrors({
        keyword: true,
        password: true
      })
    }
  }, [router])

  /** 登陆 */
  const onLogin = () => {
    signIn('credentials', {
      keyword,
      password,
      callbackUrl: router.query.callbackUrl?.toString() || '/'
    })
  }

  /** 输入用户名 */
  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      keyword: false
    })
    setKeyword(e.target.value)
  }

  /** 输入密码 */
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      password: false
    })
    setPassword(e.target.value)
  }

  return (
    <Box
      className='py-20'
      sx={{
        backgroundColor: '#f1f2f3'
      }}
    >
      <Container>
        <Grid container justifyContent='center'>
          <Grid item xs={6}>
            <Paper className='flex flex-col items-center p-8 rounded-xl' component='form' noValidate autoComplete='off'>
              <Typography className='mb-8' variant='h4'>
                Login
              </Typography>

              <TextField
                className='mb-4'
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '32px'
                  }
                }}
                label='用户名/邮箱'
                value={keyword}
                onChange={onKeywordChange}
                error={errors.keyword}
                helperText={errors.keyword ? '用户名/邮箱或者密码错误' : ''}
              />

              <TextField
                className='mb-4'
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '32px'
                  }
                }}
                type='password'
                label='密码'
                value={password}
                onChange={onPasswordChange}
                error={errors.password}
                helperText={errors.password && '用户名/邮箱或者密码错误'}
              />

              <Button
                style={{
                  borderRadius: '32px',
                  height: '48px'
                }}
                className='mt-2'
                fullWidth
                variant='contained'
                onClick={onLogin}
              >
                log in
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Login
