import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload)
    },
    toggleTodo: (state, action) => {
      const index = state.findIndex(
        item => item._id === action.payload._id
      )
      state[index].completed = action.payload.completed
    },
    editTodo: (state, action) => {
      state.forEach(item =>
        item._id === action.payload._id
        ? action.payload
        : item
      )
    },
    changePriority: (state, action) => {
      console.log('ACTIOOOOON ->', action)
      const indexTodo = state.findIndex(
        item => item._id === action.payload._id
      )
      state[indexTodo].priority = action.payload.priority
    },
    deleteTodo: (state, action) => {
      console.log('deleting...', action.payload)
      return state.filter(todo =>
        todo._id !== action.payload._id
      )
    },
    setTodos: (state, action) => {
      return action.payload
    }
  }
})

export const { addTodo, toggleTodo, editTodo, changePriority, deleteTodo, setTodos } = todoSlice.actions

export default todoSlice.reducer