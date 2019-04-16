'use strict';
const express = require('express');
const flash = require('connect-flash');
const router = express.Router();
const passport = require('passport');
const adminPath = '/admin';
const adminPathEvents = adminPath+'/events';
const common = require('../utils/common');
const dateFormat = require('dateformat');

//models
let Events = require('../models/events');
let Houses = require('../models/houses');
let Genre = require('../models/genre');
let Types = require('../models/types');

//List all users
router.get('/list', /*common.ensureAuthenticated,*/ function(req, res){
  Events.find({}, function(err, events){
    if(err){
      console.log(err);
    } else {
      res.render('list_events', {
        title: "lista de Eventos",
        empty_list: "Não existem eventos cadastrados",
        events: events
      });
    }
  });
});

//add new
router.get('/add', /*common.ensureAuthenticated,*/ function(req, res) {
  renderData(req, res);
});

router.post('/add', /*common.ensureAuthenticated,*/ function(req, res) {
console.log("novo item");

  //Validation
  req.checkBody('events_name','Nome do evento é obrigatório').notEmpty();
  req.checkBody('events_description','descrição é obrigatório').notEmpty();
  req.checkBody('events_date','Data é obrigatório').notEmpty();
  req.checkBody('events_hour','Hora é obrigatório').notEmpty();
  // req.checkBody('events_price_with_list','Valor com lista é obrigatório').notEmpty();
  // req.checkBody('events_price_without_list','Valor sem lista é obrigatório').notEmpty();
  // req.checkBody('events_price_before','Antecipado é obrigatório').notEmpty();
  // req.checkBody('events_price_birthday','Aniversariante é obrigatório').notEmpty();
  // req.checkBody('events_type_conditions','Condições é obrigatório').notEmpty();
  // req.checkBody('events_price_single','Valor único é obrigatório').notEmpty();
  /*req.checkBody('events_style','Estilo é obrigatório').notEmpty();
  req.checkBody('events_houses','Casa é obrigatório').notEmpty();
  req.checkBody('events_type','Tipo é obrigatório').notEmpty();*/

  //Get errors
  let errors = req.validationErrors();

  if(errors){
    renderData(req, res);
  } else {
      let events = new Events();
      events.name = req.body.events_name;
      events.description = req.body.events_description;

      //Formata data para inserir no banco
      var eventDateStr = req.body.events_date
      var arr = eventDateStr.split("/").map(function (val) {
        return Number(val);
      });
      var dateEventFormated = arr[2]+"-"+arr[1]+"-"+arr[0];
      events.eventDate = new Date(dateEventFormated);
      //Formata data para inserir no banco

      events.eventHour = req.body.events_hour;
      events.priceWithList = req.body.events_price_with_list;
      events.priceWithoutList = req.body.events_price_without_list
      events.priceBefore = req.body.price_before;
      events.priceSingle = req.body.price_single;
      events.cover = req.body.events_cover;
      events.birthday = req.body.birthday;
      events.typeConditions = req.body.events_type_conditions;
      events.typeEvent = req.body.events_type;
      events.id_houses = req.body.events_houses;
      events.id_genre = req.body.events_genre;

      //Save data
      events.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          console.log("SALVANDO");
          req.flash('success', 'Evento Inserido');
          console.log('Evento Inserido');
          res.redirect(adminPathEvents+'/list');
        }
      });
  }
});

function getAllGenres(){
  var query = Genre.find({}).lean();
    return query;
}

//Edit Events
router.get('/edit/:id', function(req, res){
  Events.findById(req.params.id, function(err, events){
    if(err){
      console.log(err);
    } else {
      var queryGenre = {"_id": {$in: events.id_genre}};
      Genre.find(queryGenre, function(err, genres) {
        if(err){
          console.log(err);
        } else {
          var queryType = {"_id": {$in: events.typeEvent}};
          Types.find(queryType, function(err, types) {
            if(err){
              console.log(err);
            } else {
              Houses.findById(events.id_houses, function(err, houses) {
                if(err){
                  console.log(err);
                } else {
                  res.render('edit_events', {
                    title: "Editar Eventos",
                    label_events_name: "Nome do Evento",
                    label_events_description: "Descrição do evento",
                    label_events_date: "Data",
                    label_events_hour: "Hora",
                    label_events_priceWithList: "Valor COM lista",
                    label_events_priceWithoutList: "Valor SEM lista",
                    label_events_priceBefore: "Antecipado",
                    label_events_priceSingle: "Preço único",
                    label_events_birthday: "Aniversariante",
                    label_events_typeConditions: "Condição do VIP (não aniversariante)",
                    label_events_cover: "Imagem",
                    label_events_style: "Estilo Musical", //Selectbox
                    label_events_popularity: "Popularidade", // Rating
                    label_events_belong_to: "Casas",
                    label_events_type: "Tipo",
                    id_house: events.id_houses,
                    houses: houses,
                    events: events,
                    id_genre: events.id_genre,
                    genres: genres,
                    types: types
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

router.get('/:id', function(req, res){
  Events.findById(req.params.id, function(err, events){
    if(err){
      console.log(err);
    } else {
      var queryGenre = {"_id": {$in: events.id_genre}};
      Genre.find(queryGenre, function(err, genres) {
        if(err){
          console.log(err);
        } else {
          var queryType = {"_id": {$in: events.typeEvent}};
          Types.find(queryType, function(err, types) {
            if(err){
              console.log(err);
            } else {
              Houses.findById(events.id_houses, function(err, houses) {
                if(err){
                  console.log(err);
                } else {
                  res.render('single_events', {
                    currentPath: adminPathEvents,
                    events: events,
                    genres: genres,
                    types: types,
                    houses_name: houses.name,
                    empty_list: "Não existem eventos cadastrados"
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

function renderData(req, res){
  var query = {"name": 1};
  Houses.find({}, query, function (err, houses) {
    if(err){
      console.log(err);
    } else {
      Genre.find({}, function(err, genres){
        if(err){
          console.log(err);
        } else {
          Types.find({}, function(err, types){
            if(err){
              console.log(err);
            } else {
              res.render('add_events', {
                title: "Cadastro de Eventos",
                label_events_name: "Nome do Evento",
                label_events_description: "Descrição do evento",
                label_events_date: "Data",
                label_events_hour: "Hora",
                label_events_priceWithList: "Valor COM lista",
                label_events_priceWithoutList: "Valor SEM lista",
                label_events_priceBefore: "Antecipado",
                label_events_priceSingle: "Preço único",
                label_events_birthday: "Aniversariante",
                label_events_typeConditions: "Condição do VIP (não aniversariante)",
                label_events_cover: "Imagem",
                label_events_style: "Estilo Musical", //Selectbox
                label_events_popularity: "Popularidade", // Rating
                label_events_belong_to: "Casas",
                label_events_type: "Tipo",
                list_houses : "",
                houses: houses,
                genres: genres,
                types: types
              });
            }
          });
        }
      });
    }
  });
}


module.exports = router;
