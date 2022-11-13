const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const User = require('./db/User.js')
const Contact = require('./db/Contact.js')
const Comment = require('./db/Comment.js')
const Like = require('./db/Like.js')
const Category = require('./db/Category.js')
const Post = require('./db/Post.js')

const app = express()

// file upload middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../blog-website/public/image/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
// const upload = multer({ dest: '../blog-website/public/image/' })

app.use(express.json())
app.use(cors())

// authentication api
app.get('/user', async (req, resp) => {
    let users = await User.find()
    resp.send(users)
})
app.get('/user/:id', async (req, resp) => {
    let user = await User.findOne({ _id: req.params.id })
    resp.send(user)
})
app.delete('/user/:id', async (req, resp) => {
    let result = await User.deleteOne({ _id: req.params.id })
    resp.send(result)
})
app.post('/user', async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    // delete result.password
    resp.send(result)
})

// contact api
app.get('/contact', async (req, resp) => {
    let contact = await Contact.find()
    resp.send(contact)
})
app.delete('/contact/:id', async (req, resp) => {
    let result = await Contact.deleteOne({ _id: req.params.id })
    resp.send(result)
})
app.post('/contact', async (req, resp) => {
    let contact = new Contact(req.body)
    let result = await contact.save()
    resp.send(result)
})

// comment api
app.get('/comment', async (req, resp) => {
    let comment = await Comment.find()
    resp.send(comment)
})
app.get('/comment-by-id', async (req, resp) => {
    let result = await Comment.find({ blogId: req.query.blogId })
    resp.send(result)
})
app.post('/comment', async (req, resp) => {
    let comment = new Comment(req.body)
    let result = await comment.save()
    resp.send(result)
})

//like api
app.get('/like', async (req, resp) => {
    let like = await Like.find()
    resp.send(like)
})
app.get('/like-by-blogid', async (req, resp) => {
    let result = await Like.find({ blogId: req.query.blogId })
    resp.send(result)
})
app.get('/like-by-blog-user-id', async (req, resp) => {
    let result = await Like.find({ blogId: req.query.blogId, userId: req.query.userId })
    resp.send(result)
})
app.delete('/like/:id', async (req, resp) => {
    let result = await Like.deleteOne({ _id: req.params.id })
    resp.send(result)
})
app.post('/like', async (req, resp) => {
    let like = new Like(req.body)
    let result = await like.save()
    resp.send(result)
})

// category api
app.get('/category', async (req, resp) => {
    let category = await Category.find()
    resp.send(category)
})
app.post('/category', async (req, resp) => {
    let category = new Category(req.body)
    let result = await category.save()
    resp.send(result)
})

// post api
app.get('/post', async (req, resp) => {
    let post = await Post.find()
    resp.send(post)
})
app.get('/post/:id', async (req, resp) => {
    let result = await Post.findOne({ _id: req.params.id })
    resp.send(result)
})
app.post('/post', upload.single('image'), async (req, resp) => {
    let post = new Post({ ...req.body, file: req.file.filename })
    let result = await post.save()
    resp.send(result)
})
app.put('/post/', upload.single('image'), async (req, resp) => {
    let data = await Post.updateOne({ _id: req.query.id }, { $set: { ...req.body, file: req.file.filename } })
    resp.send(data)
})
app.delete('/post/:id', async (req, resp) => {
    let result = await Post.deleteOne({ _id: req.params.id })
    resp.send(result)
})

app.get('/search-post/:key', async (req, resp) => {
    let data = await Post.find({
        "$or": [
            { "category": { $regex: req.params.key } }
        ]
    })
    resp.send(data)
})

app.listen(4000)