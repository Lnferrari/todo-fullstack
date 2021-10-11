const initialState = {
  userId: '',
  todos: []
}

export const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload
        ]
      }
    case 'TOGGLE_TODO':
      const todo = state.todos.find(
        todo => todo._id === action.payload
      )
      const updatedTodos = state.todos.map(
        item => item._id === todo._id
        ? item.completed = !item.completed
        : item
      )
      return { ...state, todos: updatedTodos }
    case 'EDIT_TODO':
      const todo = state.todos.find(
        todo => todo._id === action.payload
      )
      const updatedTodos = state.todos.map(
        item => item._id === todo._id
        ? item.completed = !item.completed
        : item
      )
    case 'DELETE_TODO':
      const filteredTodos = state.todos.filter(
        todo => todo._id !== action.payload 
      )
      return { ...state, todos: filteredTodos }
    default:
      return state
  }
}
