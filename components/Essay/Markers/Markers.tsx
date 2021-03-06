// mui
import { CardActions, IconButton } from '@mui/material'
import { Favorite, ThumbUp } from '@mui/icons-material'
// project
import type { Props } from '.'

const Markers = (props: Props) => {
  return (
    <CardActions disableSpacing className='flex flex-col justify-end p-5'>
      <IconButton disabled>
        <ThumbUp color={props.isThumbUp ? 'primary' : undefined} />
      </IconButton>

      <IconButton disabled>
        <Favorite color={props.isFavorite ? 'error' : undefined} />
      </IconButton>
    </CardActions>
  )
}

export default Markers
