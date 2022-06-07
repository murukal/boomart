import { Grid, Paper } from '@mui/material'

const Navigations = () => {
  return (
    <Grid container spacing={2}>
      {['', '', ''].map((item, index) => {
        return (
          <Grid key={index} item container xs={4} justifyContent='center' alignItems='center'>
            <Paper
              sx={{
                width: 250,
                height: 120
              }}
            ></Paper>

            <Paper
              className='absolute'
              sx={{
                width: 180,
                height: 80,
                translate: {}
              }}
            ></Paper>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Navigations
