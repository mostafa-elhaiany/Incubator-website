require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const admin = require('./routes/api/admins')
const member = require('./routes/api/members')
const highBoard = require('./routes/api/highboards')
const applicant = require('./routes/api/applicants')

// Require Router Handlers
const app = express()

// Init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// DB Config
const db = require('./config/keys').mongoURI
// Connect to mongo
mongoose
  .connect(db, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true,useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

// added cors access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})
app.use(cors())


// Direct routes to appropriate files
app.use('/api/admins', admin)
app.use('/api/members', member)
app.use('/api/highboards', highBoard)
app.use('/api/applicants', applicant)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.get('/', (req, res) => {
  res.send('homepage')
})



// 500 internal server error handler
app.use((err, _req, res, next) => {
  if (err.statusCode === 400) {
    return next(err)
  }

  return res.status(500).json({
    data: null,
    err: process.env === 'production'
      ? null
      : err,
    msg: process.env === 'production'
      ? 'Error!'
      : '500 Internal Server Error'
  })
})

// 400 error handler
app.use((err, _req, res, next) => {
  if (err.statusCode === 404) {
    return next()
  }

  return res.status(400).json({
    data: null,
    err: process.env === 'production'
      ? null
      : err,
    msg: '400 Bad Request'
  })
})

// 404 error handler
app.use((_req, res) => res.status(404)
  .json({
    data: null,
    status: 'Error',
    msg: 'Error 404: We can not find what you are looking for'
  }))

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8000

app.listen(port, () => { console.log(`Server is up and running on port ${port}`) })
