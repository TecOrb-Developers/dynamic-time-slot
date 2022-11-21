var bookingController = require('../../app/controllers/booking');
var booking = new bookingController();
var express = require('express');
var router = express.Router();

router.post('/BookingSlots', booking.BookingSlots);

module.exports = router;