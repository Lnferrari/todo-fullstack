import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { grey, lightBlue, amber, deepOrange, green, red } from '@mui/material/colors';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { changePriority, deleteTodo, toggleTodo } from '../../redux/todoSlice';
import { Checkbox } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import { updateTodoApi, deleteTodoApi } from '../../helpers/apiCalls';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const TodoItem = ({ _id, priority, title, body, deadline, completed, createdAt }) => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handlePriorityTodo = (e) => {
    dispatch(
      changePriority({ _id, priority: e.target.value})
    )
  }

  const handleToggleTodo = () => {
    dispatch(
      toggleTodo({ _id, completed: !completed })
    )
  }

  const handleDeleteTodo = () => {
    dispatch(deleteTodo({_id: _id}))
  }

  // if todo is completed => green
  // otherwise depends on priority level
  const priorityColor = (
    completed === true
    ? green[400] : priority === 'High'
    ? red[400] : priority === 'Medium'
    ? amber[300] : priority === 'Low'
    ? lightBlue[200] : grey[200]
  )



  return (
    <Card sx={{
      width: 265,
      height: 300,
      m: 4,
      boxShadow: 10,
      bgcolor: priorityColor
    }}>
      <CardContent sx={{ height: '75%'}}>
        <Typography sx={{
          fontSize: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
          }}
          color="text.secondary"
          gutterBottom
        >
          {
            !completed
            ? <DoneAllIcon sx={{ cursor: 'pointer' }}
                value="complete"
                onClick={handleToggleTodo}
              />
            : <RemoveDoneIcon sx={{ cursor: 'pointer' }}
              value="complete"
              onClick={handleToggleTodo}
              />
          }
          {moment(deadline).format('LL')}
          <HighlightOffIcon sx={{ cursor: 'pointer' }}
            name='delete'
            onClick={handleDeleteTodo}
          />
        </Typography>
        <Typography sx={{ mt: 1, mb: 2 }}
          variant="h5"
          component="div"
        >
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }}
          color="text.secondary"
        >
          {body}
        </Typography>
      </CardContent>
      {
        !completed &&
        <CardActions sx={{
          fontSize: 8,
          position: 'relative',
          bottom: '-10px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="priority"
              name="priority"
              value={priority || 'None'}
              onChange={handlePriorityTodo}
            >
              <FormControlLabel
                sx={{ marginX: 0 }}
                value="None"
                control={
                  <Radio sx={{ py: 0, px: 2.5}}
                    size='small'
                  />}
                label="None"
                labelPlacement="bottom"
                size='small'
              />
              <FormControlLabel
                sx={{ marginX: 0 }}
                value="Low"
                control={
                  <Radio sx={{ py: 0, px: 2.5}}
                    size='small'
                  />}
                label="Low"
                labelPlacement="bottom"
              />
              <FormControlLabel
                sx={{ marginX: 0 }}
                value="Medium"
                control={
                  <Radio sx={{ py: 0, px: 2.5}}
                    size='small'
                  />}
                label="Med"
                labelPlacement="bottom"
              />
              <FormControlLabel
                sx={{ marginX: 0 }}
                value="High"
                control={
                  <Radio sx={{ py: 0, px: 2.5}}
                    size='small'
                  />}
                label="High"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </CardActions>
      }
    </Card>
  )
}

export default TodoItem