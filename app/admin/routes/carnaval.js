'use strict';
const express = require('express');
const flash = require('connect-flash');
const router = express.Router();
const passport = require('passport');
const adminPath = '/admin';
const adminPathCarnaval = adminPath+'/carnaval';
const common = require('../utils/common');
const dateFormat = require('dateformat');

//models
let Carnaval = require('../models/carnaval');
let Genre = require('../models/genre');

//List all users
router.get('/list', /*common.ensureAuthenticated,*/ function(req, res){
  Carnaval.find({}, function(err, blocos){
    if(err){
      console.log(err);
    } else {
      res.render('list_blocos', {
        title: "Blocos de carnaval",
        empty_list: "Não existem Blocos cadastrados",
        blocos: blocos
      });
    }
  });
});

//add new
router.get('/add', /*common.ensureAuthenticated,*/ function(req, res) {
  renderData(req, res);
});

router.post('/add', /*common.ensureAuthenticated,*/ function(req, res) {
  //Validation
  req.checkBody('bloco_name','Nome do evento é obrigatório').notEmpty();

  //Get errors
  let errors = req.validationErrors();

  if(errors){
    renderData(req, res);
  } else {
      let carnaval = new Carnaval();
      carnaval.nameParty = req.body.bloco_name;
      carnaval.description = req.body.bloco_description;
      carnaval.eventDate = req.body.bloco_event_date;
      carnaval.initHour = req.body.bloco_event_hour_init;
      carnaval.endHour = req.body.bloco_event_hour_end;
      carnaval.linkEvento = req.body.bloco_event_link;
      carnaval.priceType = req.body.bloco_event_price;
      carnaval.cover = req.body.bloco_event_cover;
      carnaval.location = req.body.bloco_event_location;
      carnaval.coordinateslat = req.body.bloco_event_lat;
      carnaval.coordinateslng = req.body.bloco_event_lng;
      carnaval.id_genre = req.body.bloco_genre;

      //Save data
      carnaval.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          req.flash('success', 'Bloco de carnaval Inserido');
          console.log('Bloco de carnaval Inserido');
          res.redirect(adminPathCarnaval+'/list');
        }
      });
  }
});

// Update Submit Edit User
router.post('/edit/:id', function(req, res){
  let carnaval = {};
  carnaval.nameParty = req.body.bloco_name;
  description
  eventDate
  initHour
  endHour
  linkEvento
  priceType
  cover
  location

  carnaval.coordinateslat = req.body.house_coordinateslat;
  carnaval.coordinateslng = req.body.house_coordinateslng;

  let query = {_id:req.params.id}

  Houses.update(query, houses, {upsert:true}, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Casa atualizada');
      console.log('Casa atualizada');
      res.redirect(adminPathHouses+'/list');
    }
  });
});

//Edit
router.get('/edit/:id', function(req, res){
  Carnaval.findById(req.params.id, function(err, blocos){
    if(err){
      console.log(err);
    } else {
      console.log(blocos);
      renderData(req, res);
    }
  });
});

router.get('/:id', function(req, res){
  Carnaval.findById(req.params.id, function(err, blocos){
    if(err){
      console.log(err);
    } else {
      var queryGenre = {"_id": {$in: blocos.id_genre}};
      Genre.find(queryGenre, function(err, genres) {
        if(err){
          console.log(err);
        } else {
          res.render('single_carnaval', {
              currentPath: adminPathCarnaval,
              blocos: blocos,
              genres: genres,
              empty_list: "Não existem eventos cadastrados"
          });
        }
      });
    }
  });
});

function renderData(req, res){
  var query = {"name": 1};
        Genre.find({}, function(err, genres){
            if(err){
              console.log(err);
            } else {
              res.render('add_blocos', {
                title: "Cadastro de Blocos de carnaval",
                label_carnaval_name: "Nome do Bloco",
                label_carnaval_description: "Descrição",
                label_carnaval_event_date: "Data do Bloco",
                label_carnaval_event_hour_init: "Hora inicio",
                label_carnaval_event_hour_end: "Hora fim",
                label_carnaval_event_link: "Link do evento",
                label_carnaval_event_price: "Valor",
                label_carnaval_event_cover: "Capa",
                label_carnaval_event_location: "Local do bloco",
                label_carnaval_event_lat: "Latitude",
                label_carnaval_event_lng: "Longitude",
                label_events_style: "Estilo do bloco",
                genres: genres,
              });
            }
        });
  }


module.exports = router;
