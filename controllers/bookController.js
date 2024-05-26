const Book = require('../models/bookModel')

// promises med .then o .catch, istället för try o catch  

// create a fucking b00k-sama
exports.createBook = (req, res) => {
    const newBook = new Book(req.body)
    newBook.save()
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(400).json(error))
}

// create m0000re books at the SAME TIME
exports.createMultipleBooks = (req, res) => {
    const multipleBooks = req.body.multipleBooks // fixa så att req.body har en egen "multipleBooks array"
    Book.insertMany(multipleBooks) // använd modellen som en mall, skapa flera böcker !!!! 
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(400).json(error))
}

// hämta da b00ks (alla böcker)
exports.getAllBooks = (req, res) => {
    Book.find().populate('author')
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(500).json(error))
}

// uppdatera en bok baserat på titel 
exports.updateBookByTitle = (req, res) => {
    const { title, year } = req.body
    Book.findOneAndUpdate({ title }, { year })
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(400).json(error))
}

// ta bort en bok baserat på titel 
exports.removeBookByTitle = (req, res) => {
    const { title } = req.body 
    Book.findOneAndDelete( { title } )
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(400).json(error))
}


// hämta böcker av en viss författare
exports.getBooksByAuthor = (req, res) => {
    const { author } = req.body
    Book.find({author})
        .then((authorBooks) => res.status(200).json(authorBooks))
        .catch((error) => res.status(400).json(error))
} 

// räkna böcker som tillhör en viss genre 
exports.countBooksByGenre = (req, res) => {
    const { genre } = req.params
    Book.countDocuments({genre})
        .then((count) => res.status(200).json(genre, count))
        .catch((error) => res.status(400).json(error))
}
