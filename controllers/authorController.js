const Author = require('../models/authorModel')

exports.createAuthor = (req, res) => {
    const newAuthor = new Author(req.body)
    newAuthor.save()
        .then((author) => res.status(200).json(author))
        .catch((error) => res.status(400).json(error))
}

exports.getAllAuthors = (req, res) => {
    Author.find()
        .then((authors) => res.status(200).json(authors))
        .catch((error) => res.status(400).json(error))
}