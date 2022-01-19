// react
import React from 'react'
// material-ui
import { Paper, InputBase, Divider, IconButton } from '@mui/material'
import { MenuOutlined, SearchOutlined, DirectionsOutlined } from '@mui/icons-material'

const Search = () => {
  return (
    <Paper component='form' className='flex items-center py-0.5 px-1'>
      <IconButton className='p-2.5'>
        <MenuOutlined />
      </IconButton>

      <InputBase className='ml-px' placeholder='你想看什么？' />

      <IconButton className='p-2.5'>
        <SearchOutlined />
      </IconButton>

      <Divider orientation='vertical' className='m-px h-7' />

      <IconButton color='primary' className='p-2.5'>
        <DirectionsOutlined />
      </IconButton>
    </Paper>
  )
}

export default Search
