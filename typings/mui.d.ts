// mui
import type { PaletteColorOptions, PaletteColor } from '@mui/material'

declare module '@mui/material' {
  interface PaletteOptions {
    muted?: PaletteColorOptions
  }

  interface Palette {
    muted?: PaletteColor
  }
}
