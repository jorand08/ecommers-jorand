const express = require('express');

// Controllers
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');
const {
  getAllCategories,
  createCategory,
  updateCategory,
} = require('../controllers/categories.controller');

// Middlewares
const {
  protectSession,
  protectAdmin,
} = require('../middlewares/auth.middlewares');
const {
  createProductValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
const {
  protectProductOwner,
  productExists,
} = require('../middlewares/products.middlewares');

const { cateogiresExists } = require('../middlewares/categories.middelwares');

// Utils
const { upload } = require('../utils/multer.util');

const productsRouter = express.Router();

productsRouter.get('/', getAllProducts);

productsRouter.get('/categories', getAllCategories);

productsRouter.get('/:id', productExists, getProductById);

productsRouter.use(protectSession);

productsRouter.post(
  '/',
  upload.array('productImgs', 5),
  createProductValidations,
  checkValidations,
  createProduct
);

productsRouter.post('/categories', protectAdmin, createCategory);
productsRouter.patch(
  '/categories/:id',
  cateogiresExists,
  protectAdmin,
  updateCategory
);
productsRouter.patch('/:id', productExists, protectProductOwner, updateProduct);
productsRouter.delete(
  '/:id',
  productExists,
  protectProductOwner,
  deleteProduct
);

module.exports = { productsRouter };
