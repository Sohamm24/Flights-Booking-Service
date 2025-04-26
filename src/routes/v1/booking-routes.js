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
    .get('/',
        AirportController.getAirports)
    
router
    .get('/:id',
       AirplaneController.getAirplane)      
       
router
    .delete('/:id',
       AirplaneController.destoryAirplane)       
       
router
    .patch('/:id',
        AirplaneController.updateAirplane
    )       

module.exports= router