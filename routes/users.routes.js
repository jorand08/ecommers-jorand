const express = require('express');

// Middlewares
const {
  userExists,
  protectAccountOwner,
  orderExists,
} = require('../middlewares/users.middlewares');
const {
  protectSession,
  protectProduct,
  protectAdmin,
} = require('../middlewares/auth.middlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
  getUserProducts,
  getUserOrders,
  getUserOrderById,
} = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidations, checkValidations, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/', protectAdmin, getAllUsers);

usersRouter.get('/me', getUserProducts);

usersRouter.get('/orders', getUserOrders);

usersRouter.get('/orders/:id', orderExists, getUserOrderById);

usersRouter.get('/check-token', checkToken);

usersRouter.get(userExists, getUserById);
usersRouter.patch('/:id', userExists, protectAccountOwner, updateUser);
usersRouter.delete('/:id', userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter };
