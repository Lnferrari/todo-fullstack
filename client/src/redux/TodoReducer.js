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
        item => item._id === action.payload._id
      )
      const toggledTodos = state.todos.map(
        item => item._id === todo._id
        ? item.completed = !item.completed
        : item
      )
      return { ...state, todos: toggledTodos }
    case 'EDIT_TODO':
      const editTodo = state.todos.find(
        item => item._id === action.payload._id
      )
      const updatedTodos = state.todos.map(
        item => item._id === editTodo._id
        ? action.payload
        : item
      )
      return { ...state, todos: updatedTodos }
    case 'DELETE_TODO':
      const filteredTodos = state.todos.filter(
        item => item._id !== action.payload._id
      )
      return { ...state, todos: filteredTodos }
    case 'GET_ALL_TODOS':
      return { ...state, todos: action.payload }
    default:
      return state
  }
}
