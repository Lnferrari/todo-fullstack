import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserTodos } from '../../helpers/apiCalls'
import { setTodos } from '../../redux/todoSlice'
import TodoItem from './TodoItem'
import { Typography } from '@mui/material'

const TodoList = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const todos = useSelector(state => state.todos)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const todosApi = await getUserTodos(user._id)
  //     console.log('todosAPI =>' , todosApi)
  //     dispatch(
  //       setTodos(todosApi)
  //     )
  //   }
  //   fetchData()
  // }, [dispatch])


  return (
    <React.Fragment>
      {
        todos
        ? todos.map(todo =>
            <TodoItem
              key={todo._id}
              _id={todo._id}
              createdAt={todo.createdAt}
              title={todo.title}
              body={todo.body}
              priority={todo.priority}
              deadline={todo.deadline}
              completed={todo.completed}
            />
          )
        : <Typography variant="h2" component="div" gutterBottom>
            You have no tasks
          </Typography>
      }
    </React.Fragment>
  )
}

export default TodoList
