const { query, param, body, validationResult } = require('express-validator');

/**
 * Middleware to validate user_id from query parameters
 * Ensures user_id is provided and is a non-empty string
 */
const validateUserIdQuery = query('user_id')
  .notEmpty()
  .withMessage('user_id query parameter is required')
  .isString()
  .withMessage('user_id must be a string')
  .trim()
  .isLength({ min: 1 })
  .withMessage('user_id cannot be empty');

/**
 * Middleware to validate product_id from URL parameters
 * Ensures product_id is provided and is a non-empty string
 */
const validateProductIdParam = param('product_id')
  .notEmpty()
  .withMessage('product_id parameter is required')
  .isString()
  .withMessage('product_id must be a string')
  .trim()
  .isLength({ min: 1 })
  .withMessage('product_id cannot be empty');

/**
 * Middleware to handle validation errors
 * Returns 400 if validation fails
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation error',
      errors: errors.array() 
    });
  }
  next();
};

module.exports = {
  validateUserIdQuery,
  validateProductIdParam,
  handleValidationErrors
};
