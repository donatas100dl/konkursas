const express = require('express')
const router = express.Router()
const {protect} = require('../../middleware/authMiddleware')

const { getMonthExres, addDayExres, getDaysExres } = require('./calandarController')

router.get('/:year/:month/:index', protect, getMonthExres)
router.post('/:year/:month/:day', protect, addDayExres)
router.get('/:year/:month/:day',protect, getDaysExres)
module.exports = router