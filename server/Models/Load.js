const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let loadSchema = new Schema({
  created_by: {
    type: String,
    required: false
  },
  logs: {
    type: Map,
    of: String,
    required: false
  },
  assigned_to: {
    type:  String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  dimensions: {
    type: Object,
    of: Number
  },
  payload: {
    type: Number
  }
}, {
    collection: 'loads'
  })

module.exports = mongoose.model('load', loadSchema)