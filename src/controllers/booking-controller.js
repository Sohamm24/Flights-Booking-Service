const { StatusCodes } = require('http-status-codes')
const {CityService} = require('../services')
const {BookingService} = require('../services')
const { ErrorResponse , SuccessResponse }= require('../utils/common')

async function createBooking(req,res){
    try{
        const booking = await BookingService.createBooking({
            flightId : req.body.flightId,
            noofSeats: req.body.noofSeats,
            userId : req.body.userId
        }) 
        SuccessResponse.data=booking
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
    }catch(error){
       ErrorResponse.error=error
       return res
               .status(StatusCodes.INTERNAL_SERVER_ERROR)
               .json(ErrorResponse)
    }
}

async function getAirplanes(req,res){
    try{
        const airplane = await AirplaneService.getAirplanes()
        SuccessResponse.data=airplane
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
    }catch(error){
       return res
               .status(error.StatusCodes)
               .json(ErrorResponse)
    }
}

async function getAirplane(req,res){
    try{
        const airplane = await AirplaneService.getAirplane(req.params.id)
        SuccessResponse.data=airplane
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
       return res
               .status(error.statusCode)
               .json(ErrorResponse)
    }
}

async function destoryAirplane(req,res){
    try{
        const response = await AirplaneService.destroyAirplane(req.params.id)
        SuccessResponse.data=response
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
       return res
               .status(error.statusCode)
               .json(ErrorResponse)
    }
}

async function updateAirplane(req,res){
    try{
        const response = await AirplaneService.updateAirplane(req.params.id,req.params.data)
        SuccessResponse.data=response
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
       return res
               .status(error.statusCode)
               .json(ErrorResponse)
    }
}

module.exports = {
    createBooking,
    getAirplanes,
    getAirplane,
    destoryAirplane,
    updateAirplane
}