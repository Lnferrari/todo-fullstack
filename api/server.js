import express from 'express'


const app = express()
const PORT = 5000



// EXPRESS MIDDLEWARE --------------------
app.use( express.json() )


// END POINTS --------------------
app.use('/', (req, res) => {
  res.send({
    hello: 'TO DO FULLSTACK'
  })
})

app.use((req, res, next) => {
  const error = new createError(400, `Looks like you are lost...`)
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