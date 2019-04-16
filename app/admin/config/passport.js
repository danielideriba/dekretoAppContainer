"use strict";
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  //LocalStrategy
  passport.use(new LocalStrategy(function(username, password, done){
    let query = {user_name:username};
    Users.findOne(query, function(err, user){
      if (err) { return done(err); }
      if(!user){
        return done(null, false, {message: 'Usuário não encontrado'});
      }
      //Match password
      bcrypt.compare(password, user.password, function(err, isMatch){
        if (err) { return done(err); }
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Senha errada'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
