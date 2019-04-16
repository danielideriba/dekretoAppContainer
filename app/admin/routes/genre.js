'use strict';
const express = require('express');
const flash = require('connect-flash');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const adminPathGenre = '/admin/genre';
const common = require('../utils/common');

let Genre = require('../models/genre');

// List
router.get('/list',/* common.ensureAuthenticated,*/ function(req, res){
  Genre.find({}, function(err, genres){
    if(err){
      console.log(err);
    } else {
      res.render('list_add_genre', {
        title: "lista de gêneros",
        empty_list: "Não existem eventos cadastrados",
        label_user_name: "Novo Gênero",
        genres: genres,
        currentPath: adminPathGenre
      });
    }
  });
});

// add submit POST routes
router.post('/add', function(req, res){
  //Validation
  req.checkBody('genre_name','Nome do estilo é obrigatório').notEmpty();

  //Get errors
  let errors = req.validationErrors();

  if(errors){
      Genre.find({}, function(err, genres){
        if(err){
          console.log(err);
        } else {
          res.render('list_add_genre', {
            title: "lista de gêneros",
            empty_list: "Não existem eventos cadastrados",
            label_user_name: "Novo Gênero",
            genres: genres,
            currentPath: adminPathGenre
          });
        }
    });
  } else {
    let genre = new Genre();
    genre.name = req.body.genre_name;

    genre.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Gênero Inserido');
        console.log('Genero Inserido');
        res.redirect(adminPathGenre+'/list');
      }
    });
  }
});

//Deletar
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}
  Genre.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('success');
  });
});


module.exports = router;
