import { Theme } from '@mui/material'
// import React from 'react'

interface Layouts {
  toolbarHeight: React.CSSProperties['height']
  drawerWidth: React.CSSProperties['width']
}

declare module '@mui/material' {
  interface Theme {
    layouts: Layouts
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    layouts: Layouts
  }
}
