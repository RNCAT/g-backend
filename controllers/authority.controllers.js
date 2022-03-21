const bcrypt = require('bcryptjs')
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

  await prisma.authority.delete({ where: { authority_id: Number(authorityId) } })

  return res.status(204).end()
}

module.exports = {
  getAuthorities,
  getAuthority,
  AddAuthority,
  UpdateAuthority,
  DeleteAuthority,
}
