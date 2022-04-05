const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = require('../models/prisma')

async function getAuthorities(req, res) {
  const authorities = await prisma.authority.findMany()

  return res.status(200).json(authorities)
}

async function getAuthority(req, res) {
  const { authorityId } = req.params

  const authority = await prisma.authority.findUnique({ where: { authority_id: Number(authorityId) } })

  return res.status(200).json(authority)
}

async function AddAuthority(req, res) {
  const { prefix, name, surname, email, password } = req.body

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  const authority = await prisma.authority.create({
    data: {
      prefix,
      name,
      surname,
      email,
      password: hash,
    },
  })

  return res.status(201).json(authority)
}

async function UpdateAuthority(req, res) {
  const { authorityId } = req.params
  const { prefix, name, surname, email, password } = req.body

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  const authority = await prisma.authority.update({
    data: {
      prefix,
      name,
      surname,
      email,
      password: hash,
    },
    where: { authority_id: Number(authorityId) },
  })

  return res.status(200).json(authority)
}

async function DeleteAuthority(req, res) {
  const { authorityId } = req.params

  const hasBooking = await prisma.booking.count({
    where: { authority_id: Number(authorityId) },
  })

  if (hasBooking) return res.status(400).json({ message: 'Cannot delete' })

  await prisma.authority.delete({ where: { authority_id: Number(authorityId) } })

  return res.status(204).end()
}

async function login(req, res) {
  const authority = await prisma.authority.findUnique({
    where: { email: req.body.email },
  })

  if (!authority) return res.status(404).json({ message: 'Not found' })

  const isCompared = await bcrypt.compare(req.body.password, authority.password)

  if (!isCompared) return res.status(401).json({ message: 'Invalid' })

  const token = jwt.sign({ id: authority.authority_id }, 'secret')
  const DAY = 24 * 60 * 60 * 1000

  res.cookie('jwt', token, { httpOnly: true, maxAge: DAY })

  return res.json({ message: 'logged in' })
}

async function verify(req, res) {
  // eslint-disable-next-line dot-notation
  const cookie = req.cookies['jwt']

  if (!cookie) return res.status(404).json({ message: 'Unauthorized' })

  const claims = jwt.verify(cookie, 'secret')

  if (!claims) return res.status(401).json({ message: 'Unauthorized' })

  const authority = await prisma.authority.findUnique({ where: { authority_id: claims.id } })
  const { password, ...data } = authority

  return res.json({ data })
}

async function logout(req, res) {
  res.cookie('jwt', '', { maxAge: 0 })

  return res.status(200).json({ message: 'logged out' })
}

module.exports = {
  getAuthorities,
  getAuthority,
  AddAuthority,
  UpdateAuthority,
  DeleteAuthority,
  login,
  verify,
  logout,
}
