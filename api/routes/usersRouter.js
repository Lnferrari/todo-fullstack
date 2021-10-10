import express from 'express'
import {
  getAllUsers,
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/usersControllers.js'

import {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todosControllers.js'


const router = express.Router()

router.route('/')
  .get(getAllUsers)

router.route('/signup')
  .post(createUser)

router.route('/login')
  .post(loginUser)

router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

router.route('/:id/todos')
  .get(getAllTodos)
  .post(createTodo)

router.route('/:id/todos/:todoId')
  .get(getTodo)
  .patch(updateTodo)
  .delete(deleteTodo)

export default router;