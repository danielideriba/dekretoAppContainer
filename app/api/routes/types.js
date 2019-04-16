'use strict';
const express = require('express');
const router = express.Router();
const common = require('../../admin/utils/common');

//models
let Types = require('../../admin/models/types');

//List
router.get('/list', function(req, res){
  var query = {__v: 0};

  Types.find({}, query, function(err, types){
    if(err){
      console.log(err);
    } else {
      res.json({types: types});
    }
  });
});

module.exports = router;
