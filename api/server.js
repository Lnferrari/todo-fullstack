import './db-connect.js'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import createError from 'http-errors'
import usersRouter from './routes/usersRouter.js'
import cloudinary from 'cloudinary'
import cookieParser from 'cookie-parser'
import config from './config/config.js'

const app = express()
const PORT = 5000

// CONFIG -------------------------
cloudinary.v2.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.key,
  api_secret: config.cloudinary.secret,
  secure: true
})

// EXPRESS MIDDLEWARE --------------------
app.use(express.json({ limit: '1MB' }))
app.use(cookieParser())
app.use(cors({
  origin: config.frontendOrigin,
  credentials: true
}))


// END POINTS --------------------
app.get('/', (req, res) => {
  res.send({
    hello: 'TO DO FULLSTACK'
  })
})

// ROUTES ------------------------
app.use('/users', usersRouter)

app.use((req, res, next) => {
  const error = new createError(
    400,
    `Looks like you are lost...`
  )
  next(error)
})


// ---------------------------------

app.listen(PORT, () => {
  console.log(`API has started successfully on PORT ${PORT}`)
})

// ERROR HANDLING ---------------------------
app.use((err, req, res, next) => {
  res.status(err.status || 400).send({
    error: {
      message: err.message,
      status: err.status
    }
  })
})