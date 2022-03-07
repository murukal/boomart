// mui
import {
  Container,
  Box,
  Paper,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Divider
} from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

const Login = () => {
  const [keyword, setKeyword] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

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
    setKeyword(e.target.value)
  }

  /** 输入密码 */
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <Box
      component='form'
      className='py-20'
      sx={{
        backgroundColor: '#f1f2f3'
      }}
    >
      <Container>
        <Grid container justifyContent='center'>
          <Grid item xs={6}>
            <Paper className='flex flex-col items-center p-8 rounded-xl'>
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

              <Box className='w-full flex justify-between items-center mb-3'>
                <FormControlLabel label='记住我' control={<Checkbox />} />

                <Typography variant='body1'>忘记密码？</Typography>
              </Box>

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

              <Divider className='my-4 w-full'>
                <Typography variant='body1'>OR</Typography>
              </Divider>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Login
