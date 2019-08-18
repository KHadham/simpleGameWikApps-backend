require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const xssFilter = require('x-xss-protection')
const logger = require('morgan')

const port = process.env.PORT || 1700

const playerRoute = require('./src/routes/player')
const GConfig = require('./src/routes/gameConfig')
const leadRoute = require('./src/routes/leaderboard')

app.listen(port, () => {
    console.log(`Server started with port: ${port}`)
})

//virtual folder
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(cors())
app.use(xssFilter())
app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//router

app.use('/player', playerRoute)
app.use('/config', GConfig)
app.use('/leaderboard', leadRoute)