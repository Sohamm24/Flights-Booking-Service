const express=require('express')
const {InfoController} = require('../../controllers')
const airplaneRoutes= require('./airplane-routes')
const airportRoutes=require('./airport-routes')
const cityRoutes=require('./city-routes')
const flightRoutes=require('./flight-routes.js')

const router=express.Router()

router.use('/airport',airportRoutes)
router.use('/airplanes',airplaneRoutes)
router.use('/city',cityRoutes)
router.use('/flight',flightRoutes)
router.get('/info',InfoController.info)

module.exports=router; 