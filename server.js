// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const dotenv = require('dotenv')

// dotenv.config()

// const app = express()

// app.use(cors())
// app.use(express.json())

// // Routes
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/services', require('./routes/services'))
// app.use('/api/bookings', require('./routes/bookings'))

// // Test route
// app.get('/', (req, res) => {
//   res.json({ message: 'Mr. Mechanic API is running 🔧' })
// })

// // Connect DB and start server
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected')
//     app.listen(process.env.PORT, () => {
//       console.log(`🚀 Server running on port ${process.env.PORT}`)
//     })
//   })
//   .catch(err => console.log('❌ DB connection error:', err))









const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// ✅ Updated CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://mr-mechanic308.netlify.app',
  ],
  credentials: true,
}))

app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/services', require('./routes/services'))
app.use('/api/bookings', require('./routes/bookings'))

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Mr. Mechanic API is running 🔧' })
})

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    })
  })
  .catch(err => console.log('❌ DB connection error:', err))