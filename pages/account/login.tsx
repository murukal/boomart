// react
import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
// mui
import { Container, Box, Paper, TextField, Typography, Grid, Button, Alert, AlertTitle, Collapse } from '@mui/material'
import { AuthError } from '~/utils/auth'

const errors = {
  [AuthError.NotVerified]: {
    title: '邮箱未验证',
    message: '请前往admin.fantufantu.com登录后验证邮箱'
  },
  [AuthError.NotAuthenticated]: {
    title: '登录失败',
    message: '请检查您的用户名和密码'
  }
}

const Login = () => {
  const [keyword, setKeyword] = useState('')
  const [password, setPassword] = useState('')
  const [isErrorOpened, setIsErrorOpened] = useState<boolean>()
  const router = useRouter()

  /**
   * 登陆
   */
  const onLogin = () => {
    signIn('credentials', {
      keyword,
      password
    })
  }

  /**
   * 输入用户名
   */
  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  /** 输入密码 */
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  /**
   * 页面错误代码
   */
  const errorCode = useMemo(() => {
    const { error } = router.query
    return error as AuthError | undefined
  }, [router.query.error])

  /**
   * 错误提示展现
   */
  const isErrorOpenedWithErrorCode = useMemo(() => {
    return !!(isErrorOpened ?? !!errorCode)
  }, [errorCode, isErrorOpened])

  /**
   * 关闭错误提示
   */
  const onErrorClose = () => {
    setIsErrorOpened(false)
  }

  return (
    <Box
      sx={{
        backgroundColor: '#f1f2f3'
      }}
    >
      {!!errorCode && (
        <Collapse in={isErrorOpenedWithErrorCode}>
          <Alert severity='error' onClose={onErrorClose}>
            <AlertTitle>{errors[errorCode].title}</AlertTitle>
            {errors[errorCode].message}
          </Alert>
        </Collapse>
      )}

      <Container className='py-20'>
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
                登 录
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Login
