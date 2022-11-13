const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/blog")

const commentSchema = new mongoose.Schema({
    comment: String,
    blogId: String,
    name: String,
    date: String,
})

module.exports = mongoose.model('comments', commentSchema)