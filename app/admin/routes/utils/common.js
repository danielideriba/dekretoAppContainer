'use strict';
module.exports = {
  //Access Control
  ensureAuthenticated: function (req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      //req.flash('danger', 'Fazer o login');
      res.redirect('/admin/users/login');
    }
  },
  capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
