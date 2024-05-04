var createError = require('http-errors');
const session = require('express-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var app = express();
var mongoose = require('mongoose');

const Product = require('./models/product');

var userController = require('./controllers/userController');
mongoose.connect('mongodb://localhost/myproject', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
// user current 

app.use(session({
  secret: 'a',
  resave: false,
  saveUninitialized: true
}));
app.post('/login', function(req, res) {
  // Authenticate the user, then...
  user = {}
  req.session.user = user;
  res.redirect('/');
});

// app.use(function(req, res, next) {
//   console.log(req.session.user);  // Log the current user's data
//   next();  // Pass control to the next middleware function
// });
// cureent user dans tous mes views
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});
// admin
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const formidable = require('express-formidable');

const adminBro = new AdminBro({
  resources: [], // Ajoutez ici vos ressources
  rootPath: '/admin',
});

const routeradmin = AdminBroExpress.buildRouter(adminBro);


app.use(adminBro.options.rootPath, routeradmin);
//
//

  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if (!req.session.user && req.path !== '/login') {
    res.redirect('/login');
  } else {
    next();
  }
});
// current user

//
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// app.post('/login', userController.login);
// route users.js
app.use('/users', usersRouter);
app.use('/login', usersRouter);

//
// product
app.use('/products',productsRouter);
//

// cart
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

app.post('/cart/add', async (req, res, next) => {
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  req.session.cart.push(product);
  res.redirect('/cart');
});

app.get('/cart', (req, res, next) => {
  res.render('cart/index', { cart: req.session.cart });
});

//
var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  console.error(`Error on server: ${error}`);
}

function onListening() {
  console.log(`Server is listening on port ${port}`);
}
module.exports = app;
