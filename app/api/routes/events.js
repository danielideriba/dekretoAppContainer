'use strict';
const express = require('express');
const router = express.Router();
const common = require('../../admin/utils/common');

//models
let Events = require('../../admin/models/events');

//List
router.get('/list', function(req, res){
  var query = {__v: 0};

  Events.find({}, query, function(err, events){
    if(err){
      console.log(err);
    } else {
      res.json({events: events});
    }
  });
});

router.get('/list/:startTime/:endTime', function(req, res) {
  if(req.params.startTime && req.params.endTime){
    // process.exit();
    var startTime = req.params.startTime.trim();
    var endTime = req.params.endTime.trim();

    //Find
    Events.find({
        // unit_id: req.params.unit_id,
        eventDate: {
            $gt: startTime,
            $lt: endTime
        }
    }, function(err, events) {
        if (err) {
          console.log(err);
          return err
        }
        else {
            res.json(events);
        }
    });
  }
});

module.exports = router;
