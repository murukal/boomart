import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    muted: {
      main: '#687385'
    }
  },
  typography: {
    fontFamily: ['"Noto Sans SC", sans-serif'].join(','),
    fontSize: 12,

    h6: {
      fontWeight: 500
    },
    h5: {
      fontWeight: 700
    },
    h4: {
      fontWeight: 700
    },
    h3: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 900
    },
    h1: {
      fontWeight: 900
    }
  }
})

export default theme
