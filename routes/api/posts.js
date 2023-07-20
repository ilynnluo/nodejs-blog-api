const express = require('express')
const router = express.Router()
const data = {}
data.posts = require('../../data/posts.json')

router.route('/')
  .get((req, res) => {
    res.json(data.posts)
  })
  .delete((req, res) => {
    res.json({ "id": req.body.id })
  })

router.route('/:id')
  .get((req, res) => {
    res.json(data.posts.find(post => post.id == req.params.id))
  })

module.exports = router;