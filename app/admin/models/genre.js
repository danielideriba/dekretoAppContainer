'use strict';
const mongoose = require('mongoose');
const GenreSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    default: ''
  },
  datetime: { type : Date, default: Date.now }
});

let Genre = module.exports = mongoose.model('Genre', GenreSchema);
