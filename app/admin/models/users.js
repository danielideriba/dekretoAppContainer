'use strict';
const mongoose = require('mongoose');
const UsersSchema = mongoose.Schema({
  user_name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  datetime: { type : Date, default: Date.now }
});

let User = module.exports = mongoose.model('User', UsersSchema);
