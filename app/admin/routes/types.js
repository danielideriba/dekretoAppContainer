'use strict';
const express = require('express');
const flash = require('connect-flash');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const adminPathTypes = '/admin/types';
const common = require('../utils/common');

let Types = require('../models/types');

// List
router.get('/list',/* common.ensureAuthenticated,*/ function(req, res){
  Types.find({}, function(err, types){
    if(err){
      console.log(err);
    } else {
      res.render('list_types', {
        title: "lista de tipos",
        empty_list: "Não existem tipos cadastrados",
        label_type_name: "Novo Tipo",
        types: types,
        currentPath: adminPathTypes
      });
    }
  });
});

// add submit POST routes
router.post('/add', function(req, res){
  //Validation
  req.checkBody('type_name','Nome do tipo é obrigatório').notEmpty();

  //Get errors
  let errors = req.validationErrors();

  if(errors){
      Types.find({}, function(err, genres){
        if(err){
          console.log(err);
        } else {
          res.render('list_types', {
            title: "lista de tipos",
            empty_list: "Não existem tipos cadastrados",
            label_type_name: "Novo Tipo",
            types: types,
            currentPath: adminPathTypes
          });
        }
    });
  } else {
    let type = new Types();
    type.name = req.body.type_name;

    type.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Tipo Inserido');
        console.log('Tipo Inserido');
        res.redirect(adminPathTypes+'/list');
      }
    });
  }
});

//Deletar
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}
  Types.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('success');
  });
});


module.exports = router;
