const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "*")
	next()
})
app.use('/posts', require('./routes/api/posts'))
app.get('/', (req, res) => {
  res.send('Hello NodeJs')
})

app.listen(port, () => {})