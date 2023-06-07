const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/review');

const reviewController = require('../controllers/review');

router.post(
  '/save',
  [
    body('name').trim().not().isEmpty(),
    body('product_url').trim(),
    body('stars').trim().isNumeric(),
    body('date_reviewed').trim().not().isEmpty(),
    body('dateiso_scraped').trim().not().isEmpty(),
    body('review').trim(),
  ], reviewController.save_review
);

router.post(
  '/savemany',
  [
    body().isArray().withMessage('Request body must be an array'),
    body('*').isObject().withMessage('Each item in the array must be an object'),
    body('*.name').trim().not().isEmpty().withMessage('Name is required'),
    body('*.review').trim(),
    body('*.product_url').trim(),
    body('*.stars').trim().isNumeric().withMessage('Stars must be a numeric value'),
    body('*.date_reviewed').trim().not().isEmpty().withMessage('Date is required'),
    body('*.dateiso_scraped').trim().not().isEmpty().withMessage('Date ISO scraped is required'),
  ], 
  reviewController.save_reviews
);

router.get(
  '/findall',
  [
    body('url').trim().not().isEmpty().withMessage('URL is required'),
  ],
  reviewController.get_reviews_by_url
);



// router.post('/login', reviewController.login);

module.exports = router;