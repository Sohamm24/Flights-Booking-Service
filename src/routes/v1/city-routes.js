const express = require('express')

const {CityController , AirplaneController}=require('../../controllers')
const router=express.Router()

// api/v1/airplanes  POST
router
    .post('/',
        CityController.createCity)

router
    .get('/',
        AirplaneController.getAirplanes)
    
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