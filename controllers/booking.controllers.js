/* eslint-disable camelcase */
const prisma = require('../models/prisma')

async function getBooking(req, res) {
  const booking = await prisma.booking.findMany()

  return res.status(200).json(booking)
}

async function AddBooking(req, res) {
  const { start, end, price, customer_id, authority_id, room_id } = req.body

  const booking = await prisma.booking.create({
    data: {
      start,
      end,
      price,
      customer_id,
      authority_id,
      room_id,
      booking_status_id: 1,
    },
  })

  return res.status(201).json(booking)
}

async function paidBooking(req, res) {
  const { bookingId } = req.params

  await prisma.booking.update({
    data: { booking_status_id: 2 },
    where: { booking_id: Number(bookingId) },
  })

  return res.status(200).end()
}

async function checkInBooking(req, res) {
  const { bookingId } = req.params

  await prisma.booking.update({
    data: { booking_status_id: 5 },
    where: { booking_id: Number(bookingId) },
  })

  const checkIn = await prisma.checkIn.create({
    data: { booking_id: Number(bookingId) },
  })

  return res.status(201).json(checkIn)
}

async function checkOutBooking(req, res) {
  const { bookingId } = req.params

  await prisma.booking.update({
    data: { booking_status_id: 6 },
    where: { booking_id: Number(bookingId) },
  })

  const checkOut = await prisma.checkOut.create({
    data: { booking_id: Number(bookingId) },
  })

  return res.status(201).json(checkOut)
}

async function cancelBooking(req, res) {
  const { bookingId } = req.params

  await prisma.booking.update({
    data: { booking_status_id: 4 },
    where: { booking_id: Number(bookingId) },
  })

  return res.status(200).end()
}

module.exports = { AddBooking, getBooking, paidBooking, checkInBooking, checkOutBooking, cancelBooking }
