const { Router } = require('express')
const {
  AddBooking,
  getBooking,
  paidBooking,
  cancelBooking,
  checkInBooking,
  checkOutBooking,
} = require('../controllers/booking.controllers')

const router = Router()

router.get('/', getBooking)
router.post('/', AddBooking)
router.patch('/paid', paidBooking)
router.patch('/cancel', cancelBooking)
router.patch('/check-in', checkInBooking)
router.patch('/check-out', checkOutBooking)

module.exports = router
