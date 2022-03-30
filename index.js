require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const router = require('./routes')

const app = express()
const port = process.env.NODE_PORT || 3001

app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/room-types', router.roomType)
app.use('/rooms', router.room)
app.use('/authorities', router.authority)
app.use('/customers', router.customer)
app.use('/booking', router.booking)
app.use('/reports', router.report)

app.listen(port)
