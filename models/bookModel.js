const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Author',  // här refererar vi till vår skapade modell, authorModel
        required: true
    },
    year: {
        type: Number
    },
    genre: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// pre innebär att denna funktion körs automatiskt innan ett book-dokument sparas i databasen, därav PRE
bookSchema.pre('save', function(next) {
    this.title = this.title.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        next()
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book