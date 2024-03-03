const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nohp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Contact = mongoose.model('Contact' ,ContactSchema, 'contacts')
module.exports = Contact