var User = require('../models/Users');
const bcrypt = require('bcrypt');



//
const saltRounds = 10;

exports.register = function(req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hashedPassword) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(req.body.confirmPassword, saltRounds, function(err, hashedConfirmPassword) {
      if (err) {
        return next(err);
      }

      var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword
      });

      user.save()
        .then(() => res.send('User registered successfully'))
        .catch(next);
    });
  });
};
exports.login = function(req, res) {
    var { email, password } = req.body;
  
    User.find({})
      .then(users => {
        var user = users.find(user => user.email === email);
  
        // Si aucun utilisateur n'est trouvé avec l'email fourni, rediriger vers /login avec une erreur
        if (!user) {
          console.log('No user found with that email');
          return res.redirect('/login');
        }
  
        // Comparer le mot de passe fourni avec le mot de passe haché stocké
        bcrypt.compare(password, user.password, function(err, result) {
          
  
          if (result) {
            // user current
            req.session.user = user;
            //
            console.log('User logged in successfully');
            // Mettez ici votre logique pour connecter l'utilisateur
          } else {
            console.log(user.password)
            console.log(password)
            console.log('Incorrect password');
            return res.redirect('/login');
          }
        });
      })
      .catch(err => {
        console.error(err);
        return res.redirect('/login');
      });
  };