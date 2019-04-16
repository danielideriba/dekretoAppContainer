'use strict';
const express = require('express');
const router = express.Router();
const common = require('../../admin/utils/common');

//models
let Houses = require('../../admin/models/houses');

//List all users
router.get('/list', function(req, res){
  var query = {__v: 0};
  //var order = {sort: {name: -1}};

  Houses.find({}, query, function(err, houses){
    if(err){
      console.log(err);
    } else {
      res.json({houses: houses});
    }
  });
});

//House name search
router.get('/list/:name', function(req, res){
  var name = req.params.name;
  var namePretty = common.capitalizeFirstLetter(name);
  if( namePretty != undefined ){
    var query = Houses.find({});
    query.where('name', { '$regex': '.*'+namePretty+'.*' });
    query.exec(function (err, houses) {
      if(err){
        console.log(err);
      } else {
        res.json({houses: houses});
      }
    });
  } else {
    console.log("error");
  }
});

//Geofacing Under constrution
router.get('/list/:lat&:lng', function(req, res){
  var latitude = req.params.lat;
  var longitude = req.params.lng;

  if( (latitude != undefined) && (longitude != undefined) ) {
    var query = Houses.find({});
    query.where('location').near({ center: { coordinates: [10, 10], type: 'Point' }, maxDistance: 5 });

    query.exec(function (err, houses) {
            if(err){
              console.log(err);
            } else {
              res.json({houses: houses});
            }
          });
  } else {
    console.log("error");
  }
});

module.exports = router;
