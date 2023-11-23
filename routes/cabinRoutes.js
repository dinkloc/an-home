const express = require('express');
const cabinController = require('../controllers/cabinController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/')
  .get(cabinController.getAllCabins)
  .post(cabinController.createCabin);

router
  .route('/:id')
  .patch(cabinController.updateCabin)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    cabinController.deleteCabin,
  );
module.exports = router;
