import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getUserTodos } from '../helpers/apiCalls'
import AddTodoForm from '../components/dashboard/AddTodoForm'
import { Box, Grid, Autocomplete, TextField, Typography } from '@mui/material'
import SideBar from '../components/dashboard/SideBar'
import SearchIcon from '@mui/icons-material/Search';
import { green, grey } from '@mui/material/colors';
import { setTodos } from '../redux/todoSlice'
import { setUser } from '../redux/userSlice';
import { authenticateUser } from '../helpers/apiCalls';
import TodoList from '../components/dashboard/TodoList';
import Clock from '../components/dashboard/Clock'


const Dashboard = () => {
  const todos = useSelector(state => state.todos)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log('state', user)

  let history = useHistory()
  
  useEffect(() => {
    const authMe = async () => {
      try {
        const resApi = await authenticateUser()
        if (resApi.error) {
          history.push('/')
        }
        dispatch(setUser(resApi));
        const todosApi = await getUserTodos(resApi._id)
        console.log('todosAPI =>' , resApi._id)
        dispatch(
          setTodos(todosApi)
        )
      } catch (err) {
        console.log('[ERROR]', err.message)
      }
    }
    authMe()
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const todosApi = await getUserTodos(user._id)
  //     console.log('todosAPI =>' , todosApi)
  //     dispatch(
  //       setTodos(todosApi)
  //     )
  //   }
  //   fetchData()
  // }, [user])


  return (
    <Box
      sx={{
        minWidth: '100vw',
        minHeigth: '100vh',
        display: 'grid',
        gridTemplateColumns: '300px 1fr 255px',
        gridTemplateAreas: `"sidebar header chat"
        "sidebar content chat"
        "sidebar content chat"`,
      }}
    >
      <Box sx={{ gridArea: 'header', bgcolor: grey[900], p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Clock />
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          options={todos?.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search Task'
              sx={{ width: 350, bgcolor: grey[200] }}
              size='small'
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
      </Box>
      <Box sx={{
        gridArea: 'sidebar',
        bgcolor: grey[900],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingY: 2,
      }}>
        <SideBar />
      </Box>
      <Box sx={{ gridArea: 'content', bgcolor: grey[800], padding: 3 }}
        container
        direction="column"
        alignItems="stretch"  
      >
        <AddTodoForm />
        <Grid fullWidth sx={{ display: 'flex', flexWrap: 'wrap' }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <TodoList />
        </Grid>
      </Box>
      <Box sx={{ gridArea: 'chat', bgcolor: grey[900] }}>Chat</Box>
    </Box>
  )
}

export default Dashboard

