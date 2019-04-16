'use strict';
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const CarnavalSchema = mongoose.Schema({
  nameParty: {
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
    type: String,
    require: true,
    default: ''
  },
  initHour: {
    type: String,
    require: true,
    default: ''
  },
  endHour: {
    type: String,
    require: true,
    default: ''
  },
  linkEvento: {
    type: String,
    require: true,
    default: ''
  },
  priceType: {
    type: Currency,
    require: true,
    default: ''
  },
  cover: {
    type: String,
    require: true,
    default: ''
  },
  location: {
    type: String,
    require: true,
    default: ''
  },
  coordinateslat: {
    type: String,
    require: true,
    default: ''
  },
  coordinateslng: {
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

let Carnaval = module.exports = mongoose.model('Carnaval', CarnavalSchema);
