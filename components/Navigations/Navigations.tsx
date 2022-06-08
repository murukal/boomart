// mui
import { Grid, Paper } from '@mui/material'
// project
import type { Props } from '.'

const Navigations = (props: Props) => {
  return (
    <Grid container spacing={12} className={props.className + ' mb-7'} style={props.style}>
      {['', '', '', ''].map((item, index) => {
        return (
          <Grid key={index} item container xs={4} justifyContent='center' alignItems='center'>
            <Paper
              elevation={2}
              sx={{
                width: 250,
                height: 120,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                backgroundImage:
                  'url(https://boomemory-1304340057.cos.ap-shanghai.myqcloud.com/95a7c3cf-6b4b-4570-ad8e-6c55af12e078)',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                ':hover': {
                  backgroundSize: '105%',
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
              ></Paper>
            </Paper>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Navigations
