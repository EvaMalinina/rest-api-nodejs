const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let truckSchema = new Schema({
  created_by: {
    type: String,
    required: false
  },
  assigned_to: {
    type: String,
    required: false
  },
  status: {
    type: String ,
    required: false
  },
  type: {
    type: String
  }
}, {
    collection: 'trucks'
  })

module.exports = mongoose.model('truck', truckSchema)