require('dotenv').config()
const express = require('express')
const cors = require('cors')
const dbConnect = require('./dbConnect.js')
const contactRoute = require('./routes/contactRoute.js')
const userRoute = require('./routes/userRoute.js')

dbConnect()
const app = express()
const port = process.env.PORT || 8080

//middlewares
app.use(cors())
app.use(express.json())

app.use('/api', contactRoute)
app.use('/api', userRoute)

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`Listening at: ${port}`)
})

module.exports = app