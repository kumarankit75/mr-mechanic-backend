const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const { protect } = require('../middleware/auth')

// Create booking
router.post('/', protect, async (req, res) => {
  try {
    const { serviceId, scheduledDate, scheduledTime, address, totalAmount, notes } = req.body

    if (!serviceId || !scheduledDate || !scheduledTime || !address || !totalAmount) {
      return res.status(400).json({ message: 'Please fill all required fields' })
    }

    const booking = await Booking.create({
      user: req.user.id,
      service: serviceId,
      scheduledDate,
      scheduledTime,
      address,
      totalAmount,
      notes: notes || '',
    })

    await booking.populate('service')

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Get my bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('service')
      .sort({ createdAt: -1 })

    res.json({ bookings })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Cancel booking
router.patch('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    booking.status = 'cancelled'
    await booking.save()

    res.json({ message: 'Booking cancelled', booking })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router