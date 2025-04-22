const { StatusCodes } = require('http-status-codes')
const {AirplaneService} = require('../services')
const {FlightService} = require('../services')
const AppError = require('../utils/errors/app-error')
const { ErrorResponse , SuccessResponse }= require('../utils/common')

async function createFlight(req,res){
    try{
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        })
        SuccessResponse.data=flight
        return res 
           .status(StatusCodes.CREATED)
           .json(SuccessResponse)
    }catch(error){
       ErrorResponse.error=error
       return res
               .status(error.statusCode)
               .json(ErrorResponse)
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
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
    createFlight,
    getAllFlights,
    getAirplane,
    destoryAirplane,
    updateAirplane
}