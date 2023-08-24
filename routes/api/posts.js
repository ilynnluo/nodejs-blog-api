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
      return res.send('Created successfully')
    }
    return res.send('Fail, Title or ID duplicated')
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
    console.log('updating post: ', updatePost)
    let getIndex
    data.posts.forEach((post, index) => {
      if (post.id === req.body.id) getIndex = index
    })
    const duplicatedTitle = () => {
      for(i = 0; i < data.posts.length ; i++) {
        if(i !== getIndex) {
          updatePost.title !== data.posts[i]
          return true
        }
        return false
      }
    }
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