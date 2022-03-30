// const { Prisma } = require('@prisma/client')
const prisma = require('../models/prisma')

async function getRooms(req, res) {
  const rooms = await prisma.room.findMany({
    include: {
      RoomType: { select: { name: true } },
    },
  })

  return res.status(200).json(rooms)
}

async function getSearchRooms(req, res) {
  const { checkInDate, checkOutDate } = req.body

  const startDate = new Date(checkInDate)
  const endDate = new Date(checkOutDate)
  startDate.setHours(7, 0, 0, 0)
  endDate.setHours(7, 0, 0, 0)

  const searchDates = await prisma.booking.findMany({
    where: { AND: [{ start: { lte: startDate } }, { end: { gte: endDate } }, { booking_status_id: { not: 6 } }] },
    select: { room_id: true },
  })

  // eslint-disable-next-line camelcase
  const roomIdList = searchDates.map(({ room_id }) => room_id)

  const searchRooms = await prisma.room.findMany({
    where: { room_id: { notIn: roomIdList } },
    include: { RoomType: { select: { name: true, detail: true } } },
  })

  return res.status(200).json(searchRooms)
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
  getSearchRooms,
  getRoom,
  AddRoom,
  UpdateRoom,
  DeleteRoom,
}
