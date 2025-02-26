const { response } = require('express')
const Calandar = require('../../models/calandarModel.js')
const Users = require('../../models/userModel')

exports.getMonthExres = async (req, res) => {
  try {
    const month = parseInt(req.params.month)
    const year = parseInt(req.params.year)
    const index = parseInt(req.params.index)
    const user = req.user
    if (!user) {
      return res.status(401).json({ message: 'unauthorized' })
    }

    if (!month || !year || month === 0 || month > 12) {
      return res.status(400).json({
        message: 'Invalid request. Please provide valid month and year.',
      })
    }

    const lastDateOfTheLastMonth = new Date(year, month - 1, 0).getDate()

    const pipeline = [
      {
        $match: {
          // Filter tasks for the desired period (adjust as needed)
          $and: [
            {
              user_id: { $eq: user._id }, // Replace with actual user_id
            },
            {
              $or: [
                // Tasks from the last 4 days of June
                {
                  $and: [
                    { year: { $eq: year } }, // Adjust year if necessary
                    { month: { $eq: month - 1 } },
                    { day: { $gte: lastDateOfTheLastMonth - index } }, // From 22nd June onwards (adjust date)
                  ],
                },
                // Tasks from the entire July
                {
                  $and: [
                    { year: { $eq: year } }, // Adjust year if necessary
                    { month: { $eq: month } },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        $limit: 41, // Limit to 40 documents
      },
    ]
    const monthExres = await Calandar.aggregate(pipeline)

    if (monthExres.length === 0 || !monthExres) {
      return res.status(404).json({ message: 'No exresizes found this month' })
    }
    return res.status(200).json({ message: 'found', monthExres })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

exports.getDaysExres = async (req, res) => {
  try {
    const month = req.params.month
    const year = req.params.year
    const day = req.params.day

    const user = req.user
    if (!user) {
      return res.status(401).json({ message: 'unauthorized' })
    }

    if (!month || !year || month === 0 || month > 12 || day < 1 || day > 31) {
      return res.status(400).json({
        message: 'Invalid request. Please provide valid month, year, and day.',
      })
    }
    console.log(user._id)
    const dayExres = await Calandar.findOne({
      user_id: user._id,
      year,
      month,
      day,
    })

    if (!dayExres) {
      return res.status(404).json({ message: 'No exresizes found this day' })
    }
    return res.status(200).json({ message: 'found', dayExres })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

exports.addDayExres = async (req, res) => {
  try {
    const month = req.params.month
    const year = req.params.year
    const day = req.params.day

    const { exres } = req.body

    const user = req.user
    if (!user) {
      return res.status(401).json({ message: 'unauthorized' })
    }

    if (!month || !year || month === 0 || month > 12 || day < 1 || day > 31) {
      return res.status(400).json({
        message: 'Invalid request. Please provide valid month, year, and day.',
      })
    }
    const exsist = await Calandar.findOne({
      day,
      year,
      month,
      user_id: user._id,
    })

    if (exsist) {
      // already exists
      return res
        .status(404)
        .json({ message: 'you already have a exresizes on this day' })
    }

    const newExres = await Calandar.create({
      user_id: req.user._id,
      date: new Date(`${year}-${month}-${day}`),
      year,
      month,
      day,
      exres,
    })

    return res.status(200).json({ message: newExres })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
