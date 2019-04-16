'use strict';
const mongoose = require('mongoose');
const TypesSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    default: ''
  },
  datetime: { type : Date, default: Date.now }
});

let Types = module.exports = mongoose.model('Types', TypesSchema);
