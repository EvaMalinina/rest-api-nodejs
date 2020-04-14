const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let loadSchema = new Schema({
  created_by: {
    type: String
  },
  logs: {
    type: Map,
    of: String
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