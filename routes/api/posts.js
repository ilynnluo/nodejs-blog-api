const express = require('express')
const router = express.Router()
const data = {}
data.posts = require('../../data/posts.json')

router.route('/')
  // get all posts
  .get((req, res) => {
    res.json(data.posts)
  })
  // create post
  .post('/posts/create', (req, res) => {
    res.json(data.posts.push(req.body))
  })

router.route('/:id')
  // get post by id
  .get((req, res) => {
    res.json(data.posts.find(post => post.id == req.params.id))
  })

module.exports = router;