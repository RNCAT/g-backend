const bcrypt = require('bcryptjs')
const prisma = require('../models/prisma')

async function getCustomers(req, res) {
  const customers = await prisma.customer.findMany()

  return res.status(200).json(customers)
}

async function getCustomer(req, res) {
  const { customerId } = req.params

  const customer = await prisma.customer.findUnique({ where: { customer_id: Number(customerId) } })

  return res.status(200).json(customer)
}

async function AddCustomer(req, res) {
  const { prefix, name, surname, email, password } = req.body

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  const customer = await prisma.customer.create({
    data: { prefix, name, surname, email, password: hash },
  })

  return res.status(201).json(customer)
}

async function UpdateCustomer(req, res) {
  const { customerId } = req.params
  const { prefix, name, surname, email, password } = req.body

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  const customer = await prisma.customer.update({
    data: { prefix, name, surname, email, password: hash },
    where: { customer_id: Number(customerId) },
  })

  return res.status(200).json(customer)
}

async function DeleteCustomer(req, res) {
  const { customerId } = req.params

  await prisma.customer.delete({ where: { customer_id: Number(customerId) } })

  return res.status(204).end()
}

module.exports = {
  getCustomers,
  getCustomer,
  AddCustomer,
  UpdateCustomer,
  DeleteCustomer,
}
