const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['ac', 'plumbing', 'electrical', 'cleaning', 'pest', 'painting', 'carpentry'],
  },
  image: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  pills: [{
    type: String,
  }],
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('Service', serviceSchema)