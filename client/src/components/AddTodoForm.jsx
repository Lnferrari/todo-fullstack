import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Calendar from 'react-calendar'
import moment from 'moment'
import { Button, Popover } from '@mui/material'
import EventIcon from '@mui/icons-material/Event';

const initialState = {
  title: '',
  deadline: '',
}

const AddTodoForm = () => {
  const [ newTodo, setNewTodo ] = useState(initialState)
  const [anchorEl, setAnchorEl] = useState(null);

  const todos = useSelector(state => state)
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
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch({ type: 'ADD_TODO', payload: newTodo })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="first-row">
          <input onChange={handleChange} type="text" name="title" id="todo" value={newTodo.title} />
          <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
            <EventIcon fontSize="small"/> Add Date
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
        </div>
        <button type="submit">ADD</button>
      </form>

    </div>
  )
}

export default AddTodoForm
