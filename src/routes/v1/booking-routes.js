const express = require('express')
const {AirportController}=require('../../controllers')
const {AirplaneController}=require('../../controllers')
const {BookingController}=require('../../controllers')
const router=express.Router()

// api/v1/airplanes  POST
router
    .post('/',
        BookingController.createBooking)

router
    .post('/payment',
        BookingController.makePayment
    )   

module.exports= router