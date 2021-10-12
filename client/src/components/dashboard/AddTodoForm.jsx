import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../redux/todoSlice'
import Calendar from 'react-calendar'
import moment from 'moment'
import { Button, Grid, Popover, TextField, FormControl } from '@mui/material'
import EventIcon from '@mui/icons-material/Event';
import { Box } from '@mui/system'

const initialState = {
  title: '',
  deadline: '',
}

const AddTodoForm = () => {
  const [ newTodo, setNewTodo ] = useState(initialState)
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch()


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChange = e => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value
    })
  }

  const handleCalendar = (e) => {
    setNewTodo({
      ...newTodo,
      deadline: moment(e).format('L')
    })
    setAnchorEl(null)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(
      addTodo(newTodo)
    )
    setNewTodo(initialState)
  }

  return (
    <Grid container fullWidth sx={{ marginX: 4, marginY: 2 }}>
      <Box component='form' fullWidth onSubmit={handleSubmit}>
        <Grid sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
              type="text"
              name="title"
              fullWidth
              label="Task..."
              id="todo"
              size='small'
              sx={{ width: 500, bgcolor: 'white'}}
              value={newTodo.title}
              onChange={handleChange}
          />
          <Button  size='normal' aria-describedby={id} variant="contained" onClick={handleClick}>
            {newTodo.deadline || <><EventIcon fontSize="small" sx={{ marginRight: 1 }}/> <span>Add Date</span></>}
          </Button>
          <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
          >
            <Calendar onChange={handleCalendar} className='calendar'/>
          </Popover>
        </Grid>
        <Button type="submit" variant='contained'>ADD TASK</Button>
      </Box>
    </Grid>
  )
}

export default AddTodoForm
