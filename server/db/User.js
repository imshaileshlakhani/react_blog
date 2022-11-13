const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/blog")

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
})

module.exports = mongoose.model('users', userSchema)