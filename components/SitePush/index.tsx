// react
import { useEffect, useState } from 'react'
// mui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
// project
import { accordionStyles, avatarStyles } from './assets'
import { getCreativeTop5 } from '../../apis/blog'
import type { CreativeTop5 } from '../../typings/blog'
import type { User } from '../../typings/user'

const SitePush = () => {
  const [creativeTop5, setCreativeTop5] = useState<CreativeTop5>([])

  const onFetch = async () => {
    const res = await getCreativeTop5()
    setCreativeTop5(res.data || [])
  }

  useEffect(() => {
    onFetch()
  }, [])

  return (
    <Paper className='w-1/5 flex flex-col p-2 overflow-auto' elevation={3}>
      {/* 创作榜单 */}
      <Accordion style={accordionStyles} expanded={true}>
        <AccordionSummary>
          <Typography>创作榜单</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {creativeTop5.map((item) => {
              const user: User | undefined = item.users[0]

              return (
                <ListItem key={item._id}>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar sx={avatarStyles} src={user?.avatar} />
                    </ListItemAvatar>

                    <ListItemText primary={user?.username} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* 关于我们 */}
      <Accordion style={accordionStyles} expanded={true}>
        <AccordionSummary>
          <Typography>关于我们</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>开发：Murukal</Typography>
          <Typography>设计：Applause</Typography>
          <Typography>本站宗旨：致每一个热爱IT的程序猿(媛)，这是我们的All Blue！</Typography>
        </AccordionDetails>
      </Accordion>
    </Paper>
  )
}

export default SitePush
