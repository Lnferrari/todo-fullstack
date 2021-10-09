import mongoose from 'mongoose'

const MONGO_URI = 'mongodb://localhost:27017/todo-fullstack'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log(`Connection to DB established`))
.catch(err => console.log(`[ERROR] We can not connect to DB => ${err}`)