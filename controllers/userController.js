const mongoose = require('mongoose')
const User = require('../models/userModel') // importera user-modellen

exports.createUser = async (req, res) => {
    try {
        const user = await User(req.body)
        await user.save()
        res.status(201).json({message: 'User created successfully', user})
    } catch(error) {
        res.status(400).json(error)
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateUserById = async (req, res) => {
    const updates = Object.keys(req.body) // hämta egenskaperna från req.body och in med dem i updates
    const allowedUpdates = ['name', 'age', 'email'] // vad det är som ska och kan uppdateras
    const isValidKeys = updates.every(update => allowedUpdates.includes(update)) // valideringsvariabeln

    if (!isValidKeys) {
        return res.status(400).json('Fuck youuuu!')
    }

    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json('User not found')
        }

        updates.forEach(update => user[update] = req.body[update]) // uppdatera keys

        await user.save()

        res.status(200).json({message: 'User updated succesfully', user})

    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Not a valid ID')
        }

        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send({
            message: 'User has been deleted successfully',
            user: user
        })
    } catch (error) {
        res.status(400).json(error)
    }
}