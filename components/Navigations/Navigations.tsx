// mui
import { Grid, Pagination } from '@mui/material'
import { useState, useEffect, ChangeEvent } from 'react'
// project
import Navigation from '../Navigation'
import { getNavigations } from '~/apis/navigation'
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
  const onPage = async (e: ChangeEvent<unknown>, page: number) => {
    const result = await getNavigations({
      filterInput: {
        tagIds: props.tagIds
      },
      paginateInput: {
        page,
        limit: 9
      }
    })

    setNavigations(result.data?.navigations.items || [])
    setPageCount(result.data?.navigations.pageCount || 0)
  }

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
