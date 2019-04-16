"use strict";
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const port = 8080;
const adminPath = '/admin';
const apiPath = '/api';
const authPath = '/authenticate';
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require(__dirname+'/admin/config/database');
const common = require(__dirname+'/admin/utils/common');
const bcrypt = require('bcryptjs');

//init
const app = express();
const router = express.Router();
const siteRouter = express.Router();

const jwt = require('jsonwebtoken');
app.set('superSecret', config.secret);

// use morgan to log requests to the console
//app.use(morgan('dev'));

//connect with mongodb
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });
let db = mongoose.connection;

//Check connection
db.once('openUri', function(){
  console.log('Connected on mongodb');
});

//DB errors
db.on('error', function(err){
  console.log(err);
});


//Load view engine
app.set('views', path.join(__dirname, '/admin/views'));
app.set('api', path.join(__dirname, '/api'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, "public")));
app.use('/', express.static(path.join(__dirname, "public")));

// Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//passport config
require(__dirname+'/admin/config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//models
let Users = require(__dirname+'/admin/models/users');

//User validation
app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

//Home admin
app.get(adminPath, common.ensureAuthenticated, function(req, res){
  res.render('index', {
    title: "SISTEMA ADMINSTRATIVO DEKRETO",
    description: "Sistema que alimenta a RESTApi",
    charset: 'utf-8',
    userId: "adminstrador"
  });
});

//Access to api
app.use('/api', router);

//Post to authenticate on our backend
app.use(apiPath+authPath, router);
router.post(authPath, function(req, res) {
  let query = {user_name:req.body.name}
  Users.findOne(query, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Falha na autenticação. Usuário não encontrado.' });
    } else if (user) {
      bcrypt.compare(req.body.password, user.password, function(err, isMatch){
            if (!isMatch) {
              res.json({ success: false, message: 'Falha na autenticação. Senha inválida.' });
            } else {
              const payload = {
                admin: user.user_name
              };
              var token = jwt.sign(payload, app.get('superSecret'), {
                expiresIn: 1440 // expires in 24 hours
              });
              // return the information including token as JSON
              res.json({
                success: true,
                message: 'Token gerado!',
                token: token
              });
            }
        });
    }
  });
});

// router.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Falha na autenticação.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//         success: false,
//         message: 'Token não fornecido.'
//     });
//   }
// });

//Routes admin
let registerUsers = require(__dirname+adminPath+'/routes/users');
app.use(adminPath+'/users/', registerUsers);

let registerHouses = require(__dirname+adminPath+'/routes/houses');
app.use(adminPath+'/houses/', registerHouses);

let registerCarnaval = require(__dirname+adminPath+'/routes/carnaval');
app.use(adminPath+'/carnaval/', registerCarnaval);

let registerEvents = require(__dirname+adminPath+'/routes/events');
app.use(adminPath+'/events/', registerEvents);

let registerGenre = require(__dirname+adminPath+'/routes/genre');
app.use(adminPath+'/genre/', registerGenre);

let registerTypes = require(__dirname+adminPath+'/routes/types');
app.use(adminPath+'/types/', registerTypes);

//Routes api
let registerUsersApi = require(__dirname+apiPath+'/routes/users');
app.use(apiPath+'/users/', registerUsersApi);

let registerHousesApi = require(__dirname+apiPath+'/routes/houses');
app.use(apiPath+'/houses/', registerHousesApi);

let registerGenresApi = require(__dirname+apiPath+'/routes/genres');
app.use(apiPath+'/genres/', registerGenresApi);

let registerTypesApi = require(__dirname+apiPath+'/routes/types');
app.use(apiPath+'/types/', registerTypesApi);

let registerEventsApi = require(__dirname+apiPath+'/routes/events');
app.use(apiPath+'/events/', registerEventsApi);

app.listen(port, function(){
    console.log('Server DekretoApi iniciado na porta--- ' + port);
});
