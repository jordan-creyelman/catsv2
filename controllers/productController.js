var Product = require('../models/product');
var mongoose = require('mongoose');
exports.getAllProducts = async function(req, res, next) {
    try {
      const products = await Product.find({});
      res.render('products/all', { title: 'All Products', products: products });
    } catch (err) {
      next(err);
    }
  };
exports.showCreateForm = function(req, res) {
  res.render('products/create', { title: 'Create Product' });
};

exports.createProduct = function(req, res, next) {
  var product = new Product({
    name: req.body.name,
    price: req.body.price
  });

  product.save()
    .then(() => {
      res.redirect('/products/all');
    })
    .catch(err => {
      return next(err);
    });
};


exports.getProductById = async function(req, res, next) {
  var id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ObjectId');
  }
  try {
    //
    let product = await Product.findById(id);

    res.render('products/show', { title: 'Product Details', product: product });
    //
    // res.render('products/all', { title: 'Product Details', id: id });
  } catch (err) {
    next(err);
  }
};

exports.showUpdateForm = function(req, res, next) {
  Product.findById(req.params.id)
    .then(product => {
      res.render('products/update', { title: 'Update Product', product: product });
    })
    .catch(err => {
      return next(err);
    });
};

exports.updateProduct = function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => {
      res.redirect('/products/all');
    })
    .catch(err => {
      return next(err);
    });
};

// exports.deleteProduct = function(req, res, next) {
//   Product.findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.redirect('/products');
//     })
//     .catch(err => {
//       return next(err);
//     });
// };
exports.deleteProduct = async function(req, res, next) {
  var productId = req.params.id;

  try {
    await Product.findByIdAndDelete(productId);
    res.redirect('/products/all');
  } catch (err) {
    next(err);
  }
};