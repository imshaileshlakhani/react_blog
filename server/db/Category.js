const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/blog")

const categorySchema = new mongoose.Schema({
    category: String,
})

module.exports = mongoose.model('categories', categorySchema)