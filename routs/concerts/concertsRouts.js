const express = require('express')
const router = express.Router()

const { getConcerts, postConcerts, addShows, getConcertsByID, addRows, addSeats } = require('./concertsController')

router.get('/', getConcerts)
router.post('/populate', postConcerts)
router.post('/show/populate', addShows)
router.post('/row/populate', addRows)
router.post('/seat/populate', addSeats)
router.get('/:id', getConcertsByID)

// router.post("/", postConcerts)

module.exports = router