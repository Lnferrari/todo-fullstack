import React, { useState, useEffect } from 'react'
import { getUserTodos } from '../helpers/apiCalls'
import Box from '@mui/material/Box'
import AddTodoForm from '../components/AddTodoForm'

const Dashboard = () => {
  const [ userTodos, setUserTodos ] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const todosApi = await getUserTodos()
  //     setUserTodos(todosApi)
  //   }
  //   fetchData()
  // }, [])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr 240px',
        gap: 1,
        gridTemplateRows: 'auto',
        gridTemplateAreas: `"sidebar header header"
        "sidebar content chat"
        "sidebar content chat"`,
      }}
    >
      <Box sx={{ gridArea: 'header', bgcolor: 'primary.main' }}>Header</Box>
      <Box sx={{ gridArea: 'sidebar', bgcolor: 'secondary.main' }}>Sidebar</Box>
      <Box sx={{ gridArea: 'content', bgcolor: 'info.main' }}>
        <AddTodoForm />
        {userTodos}
      </Box>
      <Box sx={{ gridArea: 'chat', bgcolor: 'warning.main' }}>Chat</Box>
    </Box>
  )
}

export default Dashboard

