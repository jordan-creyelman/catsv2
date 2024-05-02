var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
router.post('/login', userController.login);
router.post('/register', userController.register);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('user/register');
});
router.get('/login', function(req, res, next) {
  res.render('user/login', { user: req.session.user });
});


router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      // Gérer l'erreur ici
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});


module.exports = router;
