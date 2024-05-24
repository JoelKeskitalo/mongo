require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./database')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

connectDB()

const NameSchema = new mongoose.Schema({
    name: {
        type: String,
        description: String,
        required: true
    }
})

const Names = mongoose.model('Names', NameSchema)


app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/names', async (req, res) => {
    const namesList = await Names.find()
    res.send(namesList)
})

app.post('/names', async (req, res) => {
    const newName = new Names(req.body)
    await newName.save()
    res.send(newName)
})


app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
