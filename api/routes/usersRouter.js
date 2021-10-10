import express from 'express'


const router = express.Router()

router.route('/')
  .get(getAllUsers)

router.route('/login')
  .post(loginUser)

router.route('/signup')
  .post(createUser)

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