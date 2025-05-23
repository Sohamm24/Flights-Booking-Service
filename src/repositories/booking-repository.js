const CrudRepository=require('./crud-repository')
const { Booking } = require('../models')
const AppError = require('../utils/errors/app-error')
const { StatusCodes } = require('http-status-codes')

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
}

module.exports = BookingRepository