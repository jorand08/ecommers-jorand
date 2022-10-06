const { Category } = require('../models/category.model');
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const cateogiresExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findOne({
    where: { id, status: 'active' },
  });

  if (!category) {
    return next(new AppError('Category does not exist with given Id', 404));
  }

  // Add user data to the req object
  req.category = category;
  next();
});

module.exports = { cateogiresExists };
