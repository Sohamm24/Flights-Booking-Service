const { StatusCodes } = require('http-status-codes')
const {CityService} = require('../services')
const {BookingService} = require('../services')
const { ErrorResponse , SuccessResponse }= require('../utils/common')

const inMemDb = {};

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
     try {
        const idempotencyKey = req.headers['x-idempotency-key'];
        if(!idempotencyKey ) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message: 'idempotency key missing'});
        }
        if(inMemDb[idempotencyKey]) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message: 'Cannot retry on a successful payment'});
        } 
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        });
        inMemDb[idempotencyKey] = idempotencyKey;
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
 }
 

module.exports = {
    createBooking,
    makePayment,
}