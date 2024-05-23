const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ // här skapar vi vår mall, vårt schema, för user

    name: {
        type: String, 
        required: true
    },

    age: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    }

})

const User = mongoose.model('User', userSchema) // här skapar vi mongoose-modellen User som fungerar som en wrapper hurt userSchema
// mongoose-modellen fungerar som en klass i OOP

module.exports = User