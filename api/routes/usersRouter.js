import express from 'express'
import {
  getAllUsers,
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  logoutUser,
} from '../controllers/usersControllers.js'
import {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todosControllers.js'
import auth from '../authentication/authentication.js'


const router = express.Router()

router.route('/')
  .get(auth, getAllUsers)
  .post(createUser)

router.route('/login')
  .post(loginUser)

router.route('/:id')
  .get(auth, getUser)
  .patch(auth, updateUser)
  .delete(auth, deleteUser)

router.route('/:id/todos')
  .get(auth, getAllTodos)
  .post(auth, createTodo)

router.route('/:id/todos/:todoId')
  .get(auth, getTodo)
  .patch(auth, updateTodo)
  .delete(auth, deleteTodo)

router.route('/logout')
  .get(logoutUser)

export default router;