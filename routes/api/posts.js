const express = require('express')
const fs = require('fs')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const data = {}
data.posts = require('../../data/posts.json')
router.use(express.json())

router.route('/')
  .get((req, res) => {
    res.json(data.posts)
  })

router.route('/create')
  .post((req, res) => {
    const newPost = req.body
    newPost.id = uuidv4()
    data.posts.push(newPost)
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
  // update post
  .put((req, res) => {
    const updatePost = req.body
    let getIndex
    data.posts.forEach((post, index) => {
      if(post.id === req.body.id) getIndex = index
    })
    data.posts.splice(getIndex, 0, updatePost)
    data.posts.splice(getIndex+1, 1)
    fs.writeFile('./data/posts.json', JSON.stringify(data.posts), (e) => {
      e && console.log('update post error: ', e)
    })
    res.send('updated successfully')
  })
module.exports = router;