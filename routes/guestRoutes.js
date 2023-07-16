const express = require('express');
const guestController = require('../controllers/guestController');

const router = express.Router();
router
  .route('/')
  .get(guestController.getAllGuests)
  .post(guestController.createGuest);

module.exports = router;
