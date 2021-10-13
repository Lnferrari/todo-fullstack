import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../../redux/todoSlice'
import Calendar from 'react-calendar'
import moment from 'moment'
import { Button, Grid, Popover, TextField, FormControl } from '@mui/material'
import EventIcon from '@mui/icons-material/Event';
import { Box } from '@mui/system'
import { addTodoApi } from '../../helpers/apiCalls'
import Clock from './Clock'

const initialState = {
  title: '',
  body: '',
  deadline: '',
}

const AddTodoForm = () => {
  const [ newTodo, setNewTodo ] = useState(initialState)
  const [anchorEl, setAnchorEl] = useState(null);

  const user = useSelector(state => state.user)
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

  const handleSubmit = async e => {
    e.preventDefault()
    if (newTodo.title) {
      const newTodoApi = await addTodoApi(
        user._id,
        newTodo
      )
      if (!newTodoApi.error)
        dispatch(
          addTodo( newTodoApi )
        )
    }
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
          <Button size='normal' aria-describedby={id} variant="contained" onClick={handleClick}>
            {newTodo.deadline || <><EventIcon fontSize="small" sx={{ marginRight: 1 }}/> <span>DUE DATE</span></>}
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
        <Grid sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
          {/* <TextField
            sx={{ width: 500, bgcolor: 'white'}}
            id="multiline-flexible"
            label="Description..."
            name="body"
            multiline
            maxRows={4}
            value={newTodo.body}
            onChange={handleChange}
          /> */}
          <Button sx={{ my: 1 }} size='large' color="success" type="submit" variant='contained'>ADD TASK</Button>
        </Grid>
      </Box>
    </Grid>
  )
}

export default AddTodoForm
