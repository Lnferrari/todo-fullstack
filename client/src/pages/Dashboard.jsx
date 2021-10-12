import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserTodos } from '../helpers/apiCalls'
import AddTodoForm from '../components/AddTodoForm'
import { Box, Grid, List } from '@mui/material'
import Todo from '../components/Todo'
import { getAllTodos } from '../redux/todoSlice'

const Dashboard = () => {
  const todos = useSelector(state => state.todos)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log('state', user)

  const userTodosMarkUp = user?.todos?.map(
    todo => (
      <Todo key={todo._id} todo={todo} />
    )
  )

  useEffect(() => {
    const fetchData = async () => {
      const todosApi = await getUserTodos(user._id)
      console.log(todosApi)
      dispatch(
        getAllTodos(todosApi)
      )
    }
    fetchData()
  }, [])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr 240px',
        gap: 1,
        gridTemplateAreas: `"sidebar header header"
        "sidebar content chat"
        "sidebar content chat"`,
      }}
    >
      <Box sx={{ gridArea: 'header', bgcolor: 'primary.main' }}>
        Header
      </Box>
      <Box sx={{ gridArea: 'sidebar', bgcolor: 'secondary.main' }}>
        Sidebar
      </Box>
      <Box sx={{ gridArea: 'content', bgcolor: 'info.main', padding: 3 }}
        container
        direction="column"
        alignItems="stretch"  
      >
        <AddTodoForm />
        <Grid fullWidth sx={{ display: 'flex', flexWrap: 'wrap' }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {userTodosMarkUp}
        </Grid>
      </Box>
      <Box sx={{ gridArea: 'chat', bgcolor: 'warning.main' }}>Chat</Box>
    </Box>
  )
}

export default Dashboard

