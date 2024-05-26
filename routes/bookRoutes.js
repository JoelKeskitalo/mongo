const express = require('express')
const bookController = require('../controllers/bookController')

const router = express.Router()

// base: localhost:3000/

// post
router.post('/books', bookController.createBook)
router.post('/books', bookController.createMultipleBooks)

// get
router.get('/books', bookController.getAllBooks)
router.get('/books', bookController.updateBookByTitle)
router.get('/books/author/:author', bookController.getBooksByAuthor)
router.get('/books/author/:genre/count', bookController.countBooksByGenre)

// delete
router.delete('/books', bookController.removeBookByTitle)








module.exports = router()