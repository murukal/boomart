// material-ui
import { Box, Drawer, useTheme } from '@mui/material'
// project
// import Menus from '../Menus'
import { Props } from './assets'

const Sidebar = (props: Props) => {
  const theme = useTheme()

  return (
    <Box component='nav'>
      <Drawer
        variant='persistent'
        anchor='left'
        open={props.isOpened}
        onClose={props.onDrawerToggle}
        PaperProps={{
          sx: {
            zIndex: 1099,
            border: 0,
            width: theme.layouts.drawerWidth,
            marginTop: theme.layouts.toolbarHeight,
            height: `calc(100% - ${theme.layouts.toolbarHeight})`
          },
          elevation: 0
        }}
      >
        {/* <Menus /> */}
      </Drawer>
    </Box>
  )
}

export default Sidebar
