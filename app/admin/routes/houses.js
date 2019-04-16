'use strict';
const express = require('express');
const flash = require('connect-flash');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const adminPathHouses = '/admin/houses';
const common = require('../utils/common');
// const path = require('path');
// var multer = require('multer');
// var storage =   multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './admin/uploads');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now());
//   }
// });

//models
let Houses = require('../models/houses');

// List
router.get('/list',/* common.ensureAuthenticated,*/ function(req, res){
  Houses.find({}, function(err, houses){
    if(err){
      console.log(err);
    } else {
      res.render('list_houses', {
        title: "lista de casas",
        empty_list: "Não existem eventos cadastrados",
        houses: houses
      });
    }
  });
});

//add new User
router.get('/add', /*common.ensureAuthenticated, */function(req, res) {
  res.render('add_houses', {
    title: "Cadastro de Casas",
    label_house_name: "Nome do casa",
    label_house_address: "Endereço",
    label_house_closeto: "Metrô mais próximo",
    label_house_email: "E-Mail",
    label_house_phone: "Telefone",
    label_house_site: "Site",
    label_house_description: "Descrição",
    label_cover: "Capa",
    label_thumb: "Thumb",
    label_house_coordinateslat: "Latitude",
    label_house_coordinateslng: "Longitude"
  });
});

// add submit POST routes
router.post('/add', function(req, res){
  //Validation
  req.checkBody('house_name','Nome do usuário é obrigatório').notEmpty();
  req.checkBody('house_address','Endereço é obrigatório').notEmpty();
  req.checkBody('house_email','E-Mail é obrigatório').notEmpty();
  req.checkBody('house_email','E-Mail é não válido ').isEmail();
  req.checkBody('house_phone','Telefone é obrigatório').notEmpty();
  req.checkBody('house_site','Site é obrigatório').notEmpty();
  req.checkBody('house_description','Descrição é obrigatório').notEmpty();
  req.checkBody('house_cover','Endereço é obrigatório').notEmpty();
  req.checkBody('house_coordinateslat','Latitude é obrigatório').notEmpty();
  req.checkBody('house_coordinateslng','Longitude é obrigatório').notEmpty();

  //Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_houses', {
      title: "Cadastro de Casas",
      label_house_name: "Nome do casa",
      label_house_address: "Endereço",
      label_house_email: "E-Mail",
      label_house_phone: "Telefone",
      label_house_site: "Site",
      label_house_description: "Descrição",
      label_cover: "Capa",
      label_thumb: "Thumb",
      label_house_coordinateslat: "Latitude",
      label_house_coordinateslng: "Longitude",
      errors: errors
    });
  } else {
    let houses = new Houses();
    houses.name = req.body.house_name;
    houses.address = req.body.house_address;
    houses.closeto = req.body.house_closeto;
    houses.email = req.body.house_email;
    houses.phone = req.body.house_phone;
    houses.site = req.body.house_site;
    houses.description = req.body.house_description;
    houses.cover = req.body.house_cover;
    houses.thumb = req.body.house_thumb;
    houses.coordinateslat = req.body.house_coordinateslat;
    houses.coordinateslng = req.body.house_coordinateslng;

    // //Image upload
    // var upload = multer({ storage : storage}).single('house_thumb');
    // upload(req,res,function(err) {
    //     if(err) {
    //         return res.end("Error uploading file.");
    //     }
    //     console.log("File is uploaded");
    // });

    houses.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Casa Inserida');
        console.log('Casa Inserida');
        res.redirect(adminPathHouses+'/list');
      }
    });
  }
});

// Update Submit Edit User
router.post('/edit/:id', function(req, res){
  let houses = {};
  houses.name = req.body.house_name;
  houses.address = req.body.house_address;
  houses.closeto = req.body.house_closeto
  houses.email = req.body.house_email;
  houses.phone = req.body.house_phone;
  houses.site = req.body.house_site;
  houses.description = req.body.house_description;
  houses.cover = req.body.house_cover;
  houses.thumb = req.body.house_thumb;
  houses.coordinateslat = req.body.house_coordinateslat;
  houses.coordinateslng = req.body.house_coordinateslng;

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

//Edit User
router.get('/edit/:id', function(req, res){
  Houses.findById(req.params.id, function(err, house){
    if(err){
      console.log(err);
    } else {
      res.render('edit_houses', {
        title: "Editar Casas",
        label_house_name: "Nome do casa",
        label_house_address: "Endereço",
        label_house_closeto: "Metrô mais próximo",
        label_house_email: "E-Mail",
        label_house_phone: "Telefone",
        label_house_site: "Site",
        label_house_description: "Descrição",
        label_house_cover: "Capa",
        label_house_thumb: "Thumb",
        label_house_coordinateslat: "Latitude",
        label_house_coordinateslng: "Longitude",
        house: house
      });
    }
  });
});

//Deletar
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}

  Houses.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('success');
  });
});

router.get('/:id', function(req, res){
  Houses.findById(req.params.id, function(err, house){
    if(err){
      console.log(err);
    } else {
      res.render('single_house', {
        currentPath: adminPathHouses,
        house: house
      });
    }
  });
});

module.exports = router;
