const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const port = 3000

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "*")
	res.header("Access-Control-Allow-Methods", "*")
	next()
})
// fixing "413 Request Entity Too Large" errors
app.use(bodyParse.json({limit: "35mb", extended: true}))
app.use(bodyParse.urlencoded({limit: "35mb", extended: true, parameterLimit: 50000}))

app.use('/posts', require('./routes/api/posts'))
app.get('/', (req, res) => {
  res.send('Hello NodeJs')
})

app.listen(port, () => {})