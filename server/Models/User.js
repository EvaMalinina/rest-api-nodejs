const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    min: [2, 'Too short, min is 2 characters']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  tel: {
    type: String,
    min: [6, 'Too short, min is 6 characters']
  },
  password: {
    type: String,
    min: [5, 'Too short, min is 5 characters'],
    max: [32, 'Too long, max is 15 characters'],
    required: 'Password is required'
  },
  role: {
    type: String
  }
}, {
    collection: 'users'
  })
  
module.exports = mongoose.model('user', userSchema)