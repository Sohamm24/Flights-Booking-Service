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

async function makePayment(req,res) {
    try{
      const payment = await BookingService.makePayment({
        bookingId : req.body.bookingId,
        totalCost : req.body.totalCost,
        userId:     req.body.userId
      })
      SuccessResponse.data=payment
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
 

module.exports = {
    createBooking,
    makePayment,
}