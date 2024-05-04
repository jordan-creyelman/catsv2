var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

// Route pour obtenir tous les produits
router.get('/all', productController.getAllProducts);

// Route pour obtenir le formulaire de création de produit
router.get('/create', productController.showCreateForm);

// Route pour créer un nouveau produit
router.post('/', productController.createProduct);
//

// Route pour obtenir un produit par ID
router.get('/:id', productController.getProductById);

// Route pour obtenir le formulaire de mise à jour de produit
router.get('/:id/edit', productController.showUpdateForm);

// Route pour mettre à jour un produit
router.post('/:id/edit', productController.updateProduct);

// Route pour supprimer un produit
router.post('/:id/delete', productController.deleteProduct);

module.exports = router;