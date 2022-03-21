const { Router } = require('express')
const {
  getAuthorities,
  getAuthority,
  AddAuthority,
  UpdateAuthority,
  DeleteAuthority,
} = require('../controllers/authority.controllers')

const router = Router()

router.get('/', getAuthorities)
router.get('/:authorityId', getAuthority)
router.post('/', AddAuthority)
router.patch('/:authorityId', UpdateAuthority)
router.delete('/:authorityId', DeleteAuthority)

module.exports = router
