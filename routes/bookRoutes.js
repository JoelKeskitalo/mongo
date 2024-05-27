const express = require('express')
const bookController = require('../controllers/bookController')

const router = express.Router()

router.post('/', bookController.createBook)
router.post('/multiple', bookController.createMultipleBooks)

router.get('/', bookController.getAllBooks)
router.put('/', bookController.updateBookByTitle)

router.delete('/', bookController.removeBookByTitle)

router.get('/author/:author', bookController.getBooksByAuthor)
router.get('/genre/:genre/count', bookController.countBooksByGenre)

module.exports = router
