const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/blog")

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    msg: String,
})

module.exports = mongoose.model('contacts', contactSchema)