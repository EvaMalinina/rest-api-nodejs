const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let driverSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  tel: {
    type: Number
  },
  password: {
    type: String
  },
  role: {
    type: String
  }
}, {
    collection: 'drivers'
  })

module.exports = mongoose.model('Driver', driverSchema)