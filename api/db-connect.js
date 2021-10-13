import mongoose from 'mongoose'
import config from './config/config.js'

mongoose.connect(config.mongooseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log(`Connection to DB established`))
.catch(err => console.log(`[ERROR] We can not connect to DB => ${err}`))