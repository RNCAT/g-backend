const { Router } = require('express')
const {
  getAuthorities,
  // getAuthority,
  AddAuthority,
  UpdateAuthority,
  DeleteAuthority,
  login,
  verify,
  logout,
} = require('../controllers/authority.controllers')

const router = Router()

router.post('/login', login)
router.get('/verify', verify)
router.post('/logout', logout)
router.get('/', getAuthorities)
// router.get('/:authorityId', getAuthority)
router.post('/', AddAuthority)
router.patch('/:authorityId', UpdateAuthority)
router.delete('/:authorityId', DeleteAuthority)

module.exports = router
