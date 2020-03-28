const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let truckSchema = new Schema({
  created_by: {
    type: String
  },
  assigned_to: {
    type: String
  },
  status: {
    type: String 
  },
  type: {
    type: String
  }
}, {
    collection: 'trucks'
  })

module.exports = mongoose.model('truck', truckSchema)