const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  purchased: {
    type: Boolean,
    required: false,
    default: false
  },
  price: {
    type: Number,
    required: true
  },
  measurements: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
