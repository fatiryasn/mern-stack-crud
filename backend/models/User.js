const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true
    },
    userpassword: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})



const User = mongoose.model('User', UserSchema, 'users')
module.exports  = User