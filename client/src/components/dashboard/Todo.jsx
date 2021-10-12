import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { grey, lightBlue, amber, deepOrange } from '@mui/material/colors';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo } from '../../redux/todoSlice';


const Todo = ({todo}) => {
  const { _id, priority, title, body, deadline, completed, createdAt } = todo
  const dispatch = useDispatch()

  const handleToggleTodo = () => {
    dispatch(
      toggleTodo({ _id, completed: !completed })
    )
  }

  const handleDeleteTodo = () => {
    dispatch(
      deleteTodo({ _id })
    )
  }

  const priorityColor = (
    priority === 'None'
    ? grey[50] : priority === 'Low'
    ? lightBlue[300] : priority === 'Medium'
    ? amber[500] : deepOrange[800]
  )



  return (
    <Card sx={{ width: 265, height: 260, m: 4, boxShadow: 10, bgcolor: priorityColor }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {moment(createdAt).calendar()}
        </Typography>
        <Typography sx={{ my: 1 }} variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {body}
        </Typography>
        {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default Todo