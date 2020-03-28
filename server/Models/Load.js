const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let loadSchema = new Schema({
  created_by: {
    type: String
  },
  logs: {
    type: [{message, time}]
  },
  assigned_to: {
    type:  String
  },
  status: {
    type: String
  },
  state: {
    type: String
  },
  dimensions: {
    type: Object = {width, length, height}
  },
  payload: {
    type: Number
  }
}, {
    collection: 'loads'
  })

module.exports = mongoose.model('load', loadSchema)