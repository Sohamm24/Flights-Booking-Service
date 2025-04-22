'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane,{
         foreignKey:'airplaneId'
      })
      this.belongsTo(models.Airport,{
        foreignKey: 'departureAirportId'
      })
      this.belongsTo(models.Airport,{
        foreignKey: 'arrivalAirportId'
      }) 
    }
  }
  flight.init({
    flightNumber: {
      type: DataTypes.STRING,
    },
    airplaneId: {
      type: DataTypes.INTEGER,
    },
    departureAirportId:{
      type: DataTypes.STRING,
    },
    arrivalAirportId:{
      type: DataTypes.STRING,
    },
    arrivalTime:{
      type: DataTypes.DATE,
    },
    departureTime:{
      type: DataTypes.DATE,
    },
    price:{
      type: DataTypes.INTEGER,
    },
    boardingGate: {
      type: DataTypes.STRING,
    },
    totalSeats:{
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return flight;
};