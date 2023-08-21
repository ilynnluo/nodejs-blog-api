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
    const duplicatedTitle = data.posts.every((p) => p.title !== newPost.title)
    const duplicatedId = data.posts.every((p) => p.id !== newPost.id)
    if (duplicatedTitle && duplicatedId) {
      newPost.id = uuidv4()
      data.posts.push(newPost)
      fs.writeFile('./data/posts.json', JSON.stringify(data.posts), (e) => {
        if (e !== null) {
          console.log('post new post: ', e)
        }
      })
      res.send('Created successfully')
    }
    res.send('Fail, Title or ID duplicated')
  }
  )

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
      if (post.id === req.body.id) getIndex = index
    })
    const duplicatedTitle = () => {
      if (data.posts.find((p) => p.title === updatePost.title).id === updatePost.id) {
        console.log(data.posts.find((p) => p.title === updatePost.title))
        console.log('updatePost.title: ', updatePost.title)
        return true
      }
      return false
    }
    console.log('duplicatedTitle(): ', duplicatedTitle())
    if (duplicatedTitle()) {
      data.posts.splice(getIndex, 0, updatePost)
      data.posts.splice(getIndex + 1, 1)
      fs.writeFile('./data/posts.json', JSON.stringify(data.posts), (e) => {
        e && console.log('update post error: ', e)
      })
      console.log('updated')
      res.send('updated successfully')
    } else {
      console.log('failed')
      res.send('Failed, Title duplicated')
    }
  })
module.exports = router;