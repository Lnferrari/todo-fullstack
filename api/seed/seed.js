import mongoose from 'mongoose'
import User from '../models/User.js'
import Todo from '../models/Todo.js'
import faker from 'faker'

let usersCreated = [];

(async function () {
  // connect to the DB
  mongoose.connect('mongodb://localhost:27017/todo-fullstack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log(`Connection to DB established`))
  .catch(err => console.log(`[ERROR] We can not connect to DB => ${err}`))

  try {
    await User.deleteMany({})
    console.log(`All users were deleted`)
  } catch (err) {
    console.log(err)
  }

  try {
    await Todo.deleteMany({})
    console.log(`All todos were deleted`)
  } catch (err) {
    console.log(err)
  }
  // Create 10 fake users
  const userPromises = Array(10)
    .fill(null)
    .map(() => {
      const userData = {
        avatar: faker.internet.avatar(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'Password123!'
      }

      console.log(`User with email ${userData.email} has been created`)

      const user = new User(userData)
      return user.save()
    })

  try {
    usersCreated = await Promise.all(userPromises)
    console.log('**********************************************')
    console.log(`All 10 fake users have been stored to the DB`)
    console.log('**********************************************')
  } catch (err) {
    console.log(err)
  }

  const userIds = usersCreated.map(
    user => user._id
  )

  // Create 5 fake todos for each user
  const todoPromises = userIds.map(id => {
    const userTodos = Array(5)
      .fill(null)
      .map(() => {
        const todoData = {
          userId: id,
          title: faker.lorem.words(3),
          body: faker.lorem.sentence(12),
          deadline: faker.date.soon(faker.datatype.number(20)),
          priority: faker.random.arrayElement(['None','Low','Medium', 'High'])
        }
        const todo = new Todo(todoData)
        return todo.save()
      })
    return userTodos
  })

  try {
    for (let userTodos of todoPromises) {
      await Promise.all(userTodos)
      console.log('**********************************************')
      console.log(`User with 5 todos has been stored into the DB`)
      console.log('**********************************************')
    }
  } catch (err) {
    console.log(err)
  }

  mongoose.connection.close()

})();