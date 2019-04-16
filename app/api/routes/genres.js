'use strict';
const express = require('express');
const router = express.Router();
const common = require('../../admin/utils/common');

//models
let Genre = require('../../admin/models/genre');

//List
router.get('/list', function(req, res){
  var query = {__v: 0};

  Genre.find({}, query, function(err, genres){
    if(err){
      console.log(err);
    } else {
      res.json({genres: genres});
    }
  });
});

module.exports = router;
