const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/blog")

const likeSchema = new mongoose.Schema({
    blogId: String,
    userId: String,
    like: Boolean,
})

module.exports = mongoose.model('likes', likeSchema)