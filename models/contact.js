'use strict';
const {
  Model, HasMany
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
  
    static associate(models) {
      // define association here
    }
  }
  Contact.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};