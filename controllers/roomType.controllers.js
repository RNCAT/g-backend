const prisma = require('../models/prisma')

async function getRoomTypes(req, res) {
  const roomTypes = await prisma.roomType.findMany()

  return res.status(200).json(roomTypes)
}

async function getRoomType(req, res) {
  const { roomTypeId } = req.params

  const roomType = await prisma.roomType.findUnique({
    where: {
      room_type_id: Number(roomTypeId),
    },
  })

  return res.status(200).json(roomType)
}

async function addRoomType(req, res) {
  const { name, bed, detail } = req.body

  const roomType = await prisma.roomType.create({ data: { name, bed, detail } })

  return res.status(201).json(roomType)
}

async function updateRoomType(req, res) {
  const { roomTypeId } = req.params
  const { name, bed, detail } = req.body

  const roomType = await prisma.roomType.update({
    data: { name, bed, detail },
    where: {
      room_type_id: Number(roomTypeId),
    },
  })

  return res.status(200).json(roomType)
}

async function deleteRoomType(req, res) {
  const { roomTypeId } = req.params

  await prisma.roomType.delete({ where: { room_type_id: Number(roomTypeId) } })

  return res.status(204).end()
}

module.exports = {
  getRoomTypes,
  getRoomType,
  addRoomType,
  updateRoomType,
  deleteRoomType,
}
