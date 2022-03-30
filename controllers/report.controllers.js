const prisma = require('../models/prisma')

async function getDailyReport(req, res) {
  const { date } = req.body

  const selectDate = new Date(date)
  const plusDate = new Date(selectDate.getUTCFullYear(), selectDate.getMonth(), selectDate.getDate() + 1, 0, 0, 0, 0)

  const prices = await prisma.payment.findMany({
    where: {
      AND: [
        {
          createdAt: { gte: selectDate },
        },
        {
          createdAt: { lte: plusDate },
        },
      ],
    },
    select: {
      booking: {
        select: {
          price: true,
        },
      },
    },
  })

  let totalPrice = 0

  prices.forEach((el) => {
    totalPrice += el.booking.price
  })

  return res.status(200).json({ totalPrice })
}

async function getMonthlyReport(req, res) {
  const { month } = req.body

  const selectMonth = new Date(month)
  const plusMonth = new Date(
    selectMonth.getUTCFullYear(),
    selectMonth.getMonth(),
    selectMonth.getDate() + 31,
    0,
    0,
    0,
    0
  )

  const data = await prisma.booking.findMany({
    where: {
      AND: [{ createdAt: { gte: selectMonth } }, { createdAt: { lte: plusMonth } }],
    },
    select: {
      _count: {
        select: { payments: true },
      },
      price: true,
      booking_status_id: true,
    },
  })

  let totalPrice = 0
  let cancelCount = 0

  data.forEach((el) => {
    if (el.booking_status_id !== 4) {
      totalPrice += el.price
    } else {
      cancelCount += 1
    }
  })

  return res.status(200).json({ bookingCount: data.length, totalPrice, cancelCount })
}

module.exports = { getDailyReport, getMonthlyReport }
