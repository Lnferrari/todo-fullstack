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
    deleteTodo: (state, action) => {
      state.filter(todo =>
        todo._id !== action.payload._id
      )
    },
    getAllTodos: (state, action) => {
      action.payload.forEach(todo =>
        state.push(todo)
      )
    }

  }
})

export const { addTodo, toggleTodo, editTodo, deleteTodo, getAllTodos } = todoSlice.actions

export default todoSlice.reducer