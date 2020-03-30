const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  tel: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String
  }
}, {
    collection: 'users'
  })
  
module.exports = mongoose.model('user', userSchema)