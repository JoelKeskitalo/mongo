const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthYear: Number,
    nationality: String
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author