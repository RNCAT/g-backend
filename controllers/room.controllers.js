const prisma = require('../models/prisma')

async function getRooms(req, res) {
  const rooms = await prisma.room.findMany()

  return res.status(200).json(rooms)
}

async function getRoom(req, res) {
  const { roomId } = req.params

  const room = await prisma.room.findUnique({ where: { room_id: Number(roomId) } })

  return res.status(200).json(room)
}

async function AddRoom(req, res) {
  const { number, price, roomTypeId } = req.body

  const room = await prisma.room.create({
    data: { number, price, room_type_id: Number(roomTypeId) },
  })

  return res.status(201).json(room)
}

async function UpdateRoom(req, res) {
  const { roomId } = req.params
  const { number, price, roomTypeId } = req.body

  const room = await prisma.room.update({
    where: { room_id: Number(roomId) },
    data: { number, price, room_type_id: Number(roomTypeId) },
  })

  return res.status(200).json(room)
}

async function DeleteRoom(req, res) {
  const { roomId } = req.params

  await prisma.room.delete({ where: { room_id: Number(roomId) } })

  return res.status(204).end()
}

module.exports = {
  getRooms,
  getRoom,
  AddRoom,
  UpdateRoom,
  DeleteRoom,
}
