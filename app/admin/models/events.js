'use strict';
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const EventsSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    default: ''
  },
  description: {
    type: String,
    trim: true,
    require: true,
    default: ''
  },
  eventDate: {
    type: Date,
    require: true,
    default: Date.now
  },
  eventHour: {
    type: String,
    require: true,
    default: ''
  },
  priceWithList: {
    type: Currency,
    require: true,
    default: ''
  },
  priceWithoutList: {
    type: Currency,
    require: true,
    default: ''
  },
  priceBefore: {
    type: Currency,
    require: true,
    default: ''
  },
  priceSingle: {
    type: Currency,
    require: true,
    default: ''
  },
  cover: {
    type: String,
    require: true,
    default: ''
  },
  birthday: {
    type: String,
    require: true,
    default: ''
  },
  typeConditions: {
    type: String,
    require: true,
    default: ''
  },
  typeEvent: {
    type: Array,
    require: true,
    default: ''
  },
  id_houses: {
    type: String,
    require: true,
    default: ''
  },
  id_genre: {
    type: Array,
    require: true,
    default: ''
  },
  datetime: { type : Date, default: Date.now }
});

let Events = module.exports = mongoose.model('Events', EventsSchema);
