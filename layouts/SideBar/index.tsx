// material-ui
import { Box, Drawer, useTheme } from '@mui/material'
// project
import SideMenus from '../SideMenus'
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
        transitionDuration={props.transitionDuration}
        SlideProps={props.SlideProps}
        PaperProps={{
          sx: {
            zIndex: 1099,
            width: theme.layouts.drawerWidth,
            marginTop: theme.layouts.toolbarHeight,
            height: `calc(100% - ${theme.layouts.toolbarHeight})`,
            border: 0
          }
        }}
      >
        <SideMenus />
      </Drawer>
    </Box>
  )
}

export default Sidebar
