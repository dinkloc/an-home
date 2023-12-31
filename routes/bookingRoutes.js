const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router.route('/stats/:day').get(bookingController.getBookingStats);
router.route('/stayAfterDate/:day').get(bookingController.getStayAfterDate);
router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
