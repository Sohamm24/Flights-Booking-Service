const CrudRepository=require('./crud-repository')
const { Booking } = require('../models')
const AppError = require('../utils/errors/app-error')
const { StatusCodes } = require('http-status-codes')
const { Op } = require('sequelize')

class BookingRepository extends CrudRepository {
    constructor(){
        super(Booking)
    }

    async get(data , transaction){
        const response = await this.model.findByPk(data,{transaction : transaction})
        if(!response){
            throw new AppError('Not abe to find the resource', StatusCodes.NOT_FOUND)
        }
        return response
    }
    async update(id,data,transaction){
        const response = await this.model.update(data,{
            where : {
                id : id
            }
        }, {transaction:transaction})
        return response
    }
    async cancelOldBooking(timestamp){
       const response = await Booking.update({ status : 'cancelled'},{
         where : {
           [Op.and] : [
             {
                createdAt : {
                    [Op.lt] : timestamp
                }
             },
             {
                status : {
                    [Op.ne] : 'booked'
                }
             },
             {
                status : {
                    [Op.ne] : 'cancelled'
                }
             }
           ]
         }
       })
       return response
    }
}

module.exports = BookingRepository