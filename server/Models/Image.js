const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
  imageName: {
    type: String,
    default: "none",
    required: true
  },
  imageData: {
    type:  String,
    required: true
  }
}, {
    collection: 'images'
  })

module.exports = mongoose.model('image', imageSchema)