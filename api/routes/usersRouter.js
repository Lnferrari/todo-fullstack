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
  .get(getTodos)


export default router;