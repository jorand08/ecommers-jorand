const jwt = require('jsonwebtoken');

// Models
const { User } = require('../models/user.model');
const { Product } = require('../models/product.model');
// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
const { Order } = require('../models/order.model');

const protectSession = catchAsync(async (req, res, next) => {
  let token;

  // Extract token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // ['Bearer', 'token']
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Session invalid', 403));
  }

  // Validate token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // decoded returns -> { id: 1, iat: 1651713776, exp: 1651717376 }
  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token is no longer available', 403)
    );
  }

  req.sessionUser = user;
  next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
  if (req.sessionUser.role !== 'admin') {
    return next(new AppError('Access not granted', 403));
  }

  next();
});

const protectProduct = (req, res, next) => {
  const { protecSession, product } = req;

  if (protecSession.id !== product.userId) {
    return next(new AppError('You are not the owner of this products', 403));
  }
  next();
};
const protectOrder = (req, res, next) => {
  const { protecSession, product } = req;

  if (protecSession.id !== Order.userId) {
    return next(new AppError('You are not the owner of this products', 403));
  }
  next();
};
module.exports = {
  protectSession,
  protectAdmin,
  protectProduct,
  protectOrder,
};
