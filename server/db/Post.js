const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/blog")

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    file: String,
    category: String,
    date: String,
})

module.exports = mongoose.model('posts', postSchema)