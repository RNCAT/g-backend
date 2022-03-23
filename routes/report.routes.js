const { Router } = require('express')
const { getDailyReport, getMonthlyReport } = require('../controllers/report.controllers')

const router = Router()

router.post('/daily', getDailyReport)
router.post('/monthly', getMonthlyReport)

module.exports = router
