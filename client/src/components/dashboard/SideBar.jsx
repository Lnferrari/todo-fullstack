import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Typography } from '@mui/material'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { grey } from '@mui/material/colors';


const SideBar = () => {
  const [open, setOpen] = useState(false);
  const todos = useSelector(state => state.todos)
  const completedTodos = useSelector(state =>
    state.todos.filter(todo =>todo.completed === true)
  )
  const notFinishedTodos = useSelector(state =>
    state.todos.filter(todo =>todo.completed === false)
  )
  const user = useSelector(state => state.user)

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Avatar
        alt={`${user.username} avatar`}
        src={user.avatar}
        sx={{ width: 100, height: 100, m: 2 }}
      />
      <Typography variant="h5" component="div">
        {user.username}
      </Typography>
      <List
      sx={{ width: '100%', color: grey[50] }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon sx={{ color: grey[50] }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <AssignmentIcon sx={{ color: grey[50] }} />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
          {
            !open &&
            <span className='sidebar-num'>{todos.length}</span>
          }
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AssignmentTurnedInIcon sx={{ color: grey[50] }} />
              </ListItemIcon>
              <ListItemText primary="Completed" />
                <span className='sidebar-num'>{completedTodos.length}</span>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AssignmentLateIcon sx={{ color: grey[50] }} />
              </ListItemIcon>
              <ListItemText primary="Not finished" />
                <span className='sidebar-num'>{notFinishedTodos.length}</span>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </React.Fragment>
  )
}

export default SideBar
