require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bookRoutes = require('./routes/bookRoutes')
const authorRoutes = require('./routes/authorRoutes')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/database')

const app = express()
app.use(express.json())

connectDB()


app.use(bodyParser.json())
app.use('/api/users', userRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/authors', authorRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`)
})
