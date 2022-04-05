/* eslint-disable camelcase */
const prisma = require('../models/prisma')

async function getBooking(req, res) {
  const booking = await prisma.booking.findMany({
    include: {
      Room: { select: { number: true } },
      Customer: { select: { prefix: true, name: true, surname: true } },
      BookingStatus: { select: { booking_status_id: true, name: true } },
      payments: { select: { createdAt: true } },
    },
  })

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
  const { bookingId } = req.body

  await prisma.booking.update({
    data: { booking_status_id: 2 },
    where: { booking_id: Number(bookingId) },
  })

  await prisma.payment.create({
    data: { booking_id: Number(bookingId) },
  })

  return res.status(200).end()
}

async function checkInBooking(req, res) {
  const { bookingId } = req.body

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
  const { bookingId } = req.body

  await prisma.booking.update({
    data: { booking_status_id: 6 },
    where: { booking_id: Number(bookingId) },
  })

  const checkIn = await prisma.checkIn.findFirst({
    where: { booking_id: Number(bookingId) },
  })

  const checkOut = await prisma.checkOut.create({
    data: { check_in_id: checkIn.check_in_id },
  })

  return res.status(201).json(checkOut)
}

async function cancelBooking(req, res) {
  const { bookingId } = req.body

  await prisma.booking.update({
    data: { booking_status_id: 4 },
    where: { booking_id: Number(bookingId) },
  })

  return res.status(200).end()
}

module.exports = { AddBooking, getBooking, paidBooking, checkInBooking, checkOutBooking, cancelBooking }
