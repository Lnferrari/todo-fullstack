import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

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