const express = require('express')
const router = express.Router()
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
    res.send('created successfully')
    // res.json(data.posts.push(req.body))
    console.log(req.body)
    // res.json(req.body)
  })

router.route('/:id')
  // get post by id
  .get((req, res) => {
    res.json(data.posts.find(post => post.id == req.params.id))
  })

module.exports = router;