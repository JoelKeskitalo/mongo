const Book = require('../models/bookModel')

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

// uppdatera en bok baserat på titel 

// ta bort en bok baserat på titel 

// hämta böcker av en viss författare 

// räkna böcker som tillhör en viss genre 

