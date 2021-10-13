import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
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
import LogoutIcon from '@mui/icons-material/Logout';
import { grey } from '@mui/material/colors';
import { logoutUser } from '../../helpers/apiCalls';
import { setUser, userLogout } from '../../redux/userSlice';
import { setTodos } from '../../redux/todoSlice';
import EventIcon from '@mui/icons-material/Event';


const SideBar = () => {
  const [open, setOpen] = useState(false);

  let todos = useSelector(state => state.todos)
  const completedTodos = useSelector(state =>
    state.todos.filter(todo =>todo.completed === true)
  )
  const notFinishedTodos = useSelector(state =>
    state.todos.filter(todo =>todo.completed === false)
  )
  let user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  let history = useHistory()
  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogOut = async () => {
    const loggedOutUser = await logoutUser()
    dispatch(
      userLogout({}),
      setTodos({})
    )
    if (!loggedOutUser.error) {
      history.push('/')
    }
  }

  return (
    <React.Fragment>
      <Avatar
        alt={`${user.username} avatar`}
        src={user.avatar}
        sx={{ width: 100, height: 100, m: 2, border: 1, boxShadow: 5 }}
      />
      <Typography sx={{ fontWeight: 'bold', color: 'white' }} variant="h5" component="div">
        {user.username}
      </Typography>
      <Typography sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
        <LogoutIcon sx={{ mx: 1 }} onClick={handleLogOut} />
        Log Out
      </Typography>
      <List
        sx={{ width: '100%', color: grey[50], mt: 2 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon sx={{ color: grey[50] }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <EventIcon sx={{ color: grey[50] }} />
          </ListItemIcon>
          <ListItemText primary="Today" />
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
