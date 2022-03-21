const { Router } = require('express')
const {
  getRoomTypes,
  getRoomType,
  addRoomType,
  updateRoomType,
  deleteRoomType,
} = require('../controllers/roomType.controllers')

const router = Router()

router.get('/', getRoomTypes)
router.get('/:roomTypeId', getRoomType)
router.post('/', addRoomType)
router.patch('/:roomTypeId', updateRoomType)
router.delete('/:roomTypeId', deleteRoomType)

module.exports = router
