// mui
import { Grid, Pagination } from '@mui/material'
import { useState, useEffect } from 'react'
// project
import Navigation from '../Navigation'
import type { Props } from '.'
import type { Navigation as NavigationType } from '~/typings/navigation'

const Navigations = (props: Props) => {
  const [navigations, setNavigations] = useState<NavigationType[]>([])
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    setNavigations(props.navigations)
    setPageCount(props.pageCount)
  }, [props])

  /**
   * 翻页
   */
  const onPage = () => {}

  return (
    <>
      <Grid container className={props.className} style={props.style}>
        {navigations.map((navigation) => {
          return (
            <Grid key={navigation.id} item container xs={4} justifyContent='center'>
              <Navigation navigation={navigation} />
            </Grid>
          )
        })}
      </Grid>

      <Pagination count={pageCount} color='primary' onChange={onPage} />
    </>
  )
}

export default Navigations
