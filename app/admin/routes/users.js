'use strict';
const express = require('express');
const flash = require('connect-flash');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const adminPath = '/admin';
const adminPathUsers = adminPath+'/users';
const common = require('../utils/common');


//models
let Users = require('../models/users');

//add new User
router.get('/add', function(req, res) {
  res.render('add_users', {
    title: "Cadastro de Usuários",
    label_user_name: "Nome do usuário",
    label_email: "E-Mail",
    label_email_confirm: "Confirmar E-Mail",
    label_password: "Senha",
    label_password2: "Confirmar senha"
  });
});

// add submit POST routes
router.post('/add', function(req, res){
  //Validation
  req.checkBody('user_name','Nome do usuário é obrigatório').notEmpty();
  req.checkBody('email','E-Mail é obrigatório').notEmpty();
  req.checkBody('email','E-Mail é não válido ').isEmail();
  req.checkBody('password','Senha é obrigatório').notEmpty();
  req.checkBody('password2','Senha não confere').equals(req.body.password);

  //Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_users', {
      title: "Cadastro de Usuários",
      label_user_name: "Nome do usuário",
      label_email: "E-Mail",
      label_email_confirm: "Confirmar E-Mail",
      label_password: "Senha",
      label_password2: "Confirmar senha",
      errors: errors
    });
  } else {
    let users = new Users();
    users.user_name = req.body.user_name;
    users.email = req.body.email;
    users.password = req.body.password;

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(users.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        users.password = hash;

        users.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success', 'Usuário Inserido');
            console.log('Usuário Inserido');
            res.redirect(adminPathUsers+'/list');
          }
        });
      });
    });
  }
});

// Update Submit Edit User
router.post('/edit/:id', function(req, res){
  let users = {};
  users.user_name = req.body.user_name;
  users.email = req.body.email;
  users.password = req.body.password;

  let query = {_id:req.params.id}

  Users.findOneAndUpdate(query, users,{upsert:true}, function(err){
    if(err){
      return res.send(500, { error: err });
    } else {
      req.flash('success', 'Usuário atualizado');
      console.log('Usuário atualizado');
      res.redirect(adminPathUsers+'/list');
    }
  });

});

//Edit User
router.get('/edit/:id', common.ensureAuthenticated, function(req, res){
  Users.findById(req.params.id, function(err, user){
    if(err){
      console.log(err);
    } else {
      res.render('edit_user', {
        title: "Editar Usuário",
        label_user_name: "Nome do usuário",
        label_email: "E-Mail",
        label_email_confirm: "Confirmar E-Mail",
        label_password: "Senha",
        label_password2: "Confirmar Senha",
        name: user
      });
    }
  });
});

//List all users
router.get('/list', common.ensureAuthenticated, function(req, res){
  Users.find({}, function(err, users){
    if(err){
      console.log(err);
    } else {
      res.render('list_users', {
        title: "lista de usuários",
        empty_list: "Não existem eventos cadastrados",
        users: users
      });
    }
  });
});

//Deletar
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}

  Users.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('success');
  });
});

router.get('/login', function(req, res){
  res.render('login', {
    title: "Login"
  });
});

//login process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect: adminPath,
    failureRedirect: adminPath+'/users/login',
    failureFlash: true
  })(req, res, next);
});

//Logout process
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Usuário deslogado");
  res.redirect(adminPath+"/users/login");
});

//Single user
router.get('/:id', common.ensureAuthenticated, function(req, res){
  Users.findById(req.params.id, function(err, user){
    if(err){
      console.log(err);
    } else {
      res.render('single_user', {
        name: user
      });
    }
  });
});

module.exports = router;
