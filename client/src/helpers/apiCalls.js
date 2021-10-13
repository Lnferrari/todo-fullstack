import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

/* ----- USER ----- */

export const signupUser = async (userData) => {
  try {
    const resApi = await (
      await axios.post(
        `/users`,
        userData
      )
    ).data;
    return resApi
  } catch (err) {
    return err.response.data
  }
}

export const loginUser = async (userData) => {
  try {
    const resApi = await (
      await axios.post(
        `/users/login`,
        userData
      )
    ).data
    return resApi
  } catch (err) {
    return err.response.data
  }
}

export const logoutUser = async () => {
  try {
    const resApi = await (
      await axios(`/users/logout`)
    ).data
    console.log('LOGOUT =>', resApi)
    return resApi
    } catch (err) {
      return err.response.data
    }
  }
  
export const authenticateUser = async () => {
  try {
    const resApi = await (
      await axios.post('/users/auth')
    ).data
    return resApi
  } catch (err) {
    return err.response.data
  }
}

/* ----- TODOS ----- */

export const getUserTodos = async (userId) => {
  try {
    const resApi = await (
      await axios(`/users/${userId}/todos`)
    ).data
    return resApi
  } catch (err) {
    return err.response.data
  }
}

export const addTodoApi = async (userId, todoData) => {
  try {
    console.log('userId todoAPI', userId)
    const resApi = await (
      await axios.post(
        `/users/${userId}/todos`,
        { userId: userId, ...todoData }
      )
    ).data
    return resApi
  } catch (err) {
    return err.response.data
  }
}

// export const toggleTodoApi = async (userId, todoId) => {

// }

export const updateTodoApi = async (userId, todoId, todoData) => {
  try {
    const resApi = await (
      await axios.patch(
        `/users/${userId}/todos/${todoId}`,
        todoData
      )
    ).data
    return resApi
  } catch (err) {
    return err.response.data
  }
}

export const deleteTodoApi = async (userId, todoId) => {
  try {
    const resApi = await (
      await axios.delete(
        `/users/${userId}/todos/${todoId}`
      )
    ).data
    return resApi
  } catch (err) {
    return err.response.data
  }
}