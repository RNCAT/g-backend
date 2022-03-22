const { Router } = require('express')
const { AddBooking } = require('../controllers/booking.controllers')

const router = Router()

router.post('/', AddBooking)
router.patch('/:bookingId')

module.exports = router
