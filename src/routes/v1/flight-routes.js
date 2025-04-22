const express = require('express')

const {FlightController, AirplaneController}=require('../../controllers')
const router=express.Router()

// api/v1/airplanes  POST
router
    .post('/',
        FlightController.createFlight)

router
    .get('/',
        FlightController.getAllFlights)
    
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