const { Router } = require('express')
const {
  getRooms,
  getSearchRooms,
  getRoom,
  AddRoom,
  UpdateRoom,
  DeleteRoom,
} = require('../controllers/room.controllers')

const router = Router()

router.get('/', getRooms)
router.get('/:roomId', getRoom)
router.post('/search', getSearchRooms)
router.post('/', AddRoom)
router.patch('/:roomId', UpdateRoom)
router.delete('/:roomId', DeleteRoom)

module.exports = router
