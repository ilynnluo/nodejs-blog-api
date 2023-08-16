const express = require('express')
const fs = require('fs')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const data = {}
data.posts = require('../../data/posts.json')
router.use(express.json())
// app.use(express.urlencoded({ extended: true }))

router.route('/')
  .get((req, res) => {
    res.json(data.posts)
  })

router.route('/create')
  .post((req, res) => {
    const newPost = req.body
    newPost.id = uuidv4()
    data.posts.push(newPost)
    console.log('updated posts: ', data.posts)
    fs.writeFile('./data/posts.json', JSON.stringify(data.posts), (e) => {
      if(e !== null) {
        console.log('post new post: ', e)
      }
    })
    res.send('created successfully')
  })

router.route('/:id')
  // get post by id
  .get((req, res) => {
    res.json(data.posts.find(post => post.id == req.params.id))
  })

module.exports = router;