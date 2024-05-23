require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./config/database')

const app = express();
app.use(express.json());

connectDB()

const { User, Product } = require('./models')





app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body); // Skapa ett nytt objekt av User-modellen/mallen
        await user.save(); // Vänta på att användaren sparas
        res.status(201).send(user); // Skicka den sparade användaren i svaret
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/users/:id', async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Not a valid ID')
        }

        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(400).send('User not found.')
        }

        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.put('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body) // här hämtar vi KEYS(egenskaper) från body, inte VALUES. 
    const allowedUpdates = ['name', 'age', 'email']

    const isValidKeys = updates.every(update => allowedUpdates.includes(update))
    
    if (!isValidKeys) {
        return res.status(400).send('Invalid update fields')
    }

    try {
        const user = await User.findById(req.params.id) // hitta något att uppdatera 

        if (!user) {
            return res.status(404).send('User not found')
        }

        updates.forEach(update => user[update] = req.body[update]) // uppdatera det som ska uppdateras 

        await user.save() // vänta på att uppdateringen sparas 

        res.status(200).send(user)

    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.delete('/users/:id', async (req, res) => {
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
        res.status(500).send(error.message);
    }
})



app.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`)
})
