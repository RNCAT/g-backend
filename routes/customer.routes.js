const { Router } = require('express')
const {
  getCustomers,
  getCustomer,
  AddCustomer,
  UpdateCustomer,
  DeleteCustomer,
} = require('../controllers/customer.controllers')

const router = Router()

router.get('/', getCustomers)
router.get('/:customerId', getCustomer)
router.post('/', AddCustomer)
router.patch('/:customerId', UpdateCustomer)
router.delete('/:customerId', DeleteCustomer)

module.exports = router
