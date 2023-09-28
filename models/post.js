'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.TEXT
  },
   {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};