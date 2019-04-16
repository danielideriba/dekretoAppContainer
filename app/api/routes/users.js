'use strict';
const express = require('express');
const router = express.Router();

//models
let Users = require('../../admin/models/users');

//List all users
router.get('/list', function(req, res){
  //res.json({ message: 'LISTAGEM DE USUARIOS!!' });
  Users.find({}, {_id: 0, password: 1, user_name: 1, email: 1 }, function(err, users){
    if(err){
      console.log(err);
    } else {
      res.json({users : users});
    }
  });
});

module.exports = router;
