// Models
const { Category } = require('../models/category.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({ where: { status: 'active' } });

  res.status(200).json({ categories });
});

const createCategory = catchAsync(async (req, res, next) => {
  const { newName } = req.body;
  const { category } = req;
  console.log('hola');
  if (newName.length === 0) {
    return next(new AppError('Name cannot be empty', 400));
  }

  const newCategory = await Category.create({ name: newName });

  res.status(201).json({
    newCategory,
  });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { category } = req;
  const { newName } = req.body;
  if (newName.length === 0) {
    return next(new AppError('The updated name cannot be empty', 400));
  }

  await category.update({ name: newName });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
};
