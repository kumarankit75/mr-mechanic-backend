const express = require('express')
const router = express.Router()
const Service = require('../models/Service')
const { protect } = require('../middleware/auth')

// Get all services
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query
    let query = { isAvailable: true }

    if (category && category !== 'all') {
      query.category = category
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { desc: { $regex: search, $options: 'i' } },
      ]
    }

    const services = await Service.find(query)
    res.json({ services })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) return res.status(404).json({ message: 'Service not found' })
    res.json({ service })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router