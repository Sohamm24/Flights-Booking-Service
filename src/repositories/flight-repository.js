const CrudRepository=require('./crud-repository')
const { Flight, Airplane , Airport , City} = require('../models')
const {Sequelize} =require('sequelize')

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight)
    }

    async getAllFlights(filter,sort){
        const response=await Flight.findAll({
            where: filter,
            order:sort,
            include:[
                {
                    model : Airplane,
                    required : true,
                    as : 'airplaneDetail'
                },
                {
                    model: Airport,
                    required : true,
                    as : 'departureAirport',
                    on : Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=",Sequelize.col("departureAirport.code")),
                    include : {
                        model :  City,
                        required : true
                    }
                },
                {
                    model: Airport,
                    required : true,
                    as : 'arrivalAirport',
                    on : Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=",Sequelize.col("arrivalAirport.code")),
                    include : {
                        model :  City,
                        required : true
                    }
                }
            ]
        })
     return response
    }

    async updateRemainingSeats(flightId,seats,dec=true){
      if(dec){
        const response = await Flight.decrement('totalSeats',{by:seats})
        return response
       }
      else{
        const response = await Flight.increment('totalSeats',{by:seats})
        return response
      } 
    }
}

module.exports = FlightRepository