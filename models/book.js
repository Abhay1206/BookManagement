'use strict';
import { Model, Sequelize } from 'sequelize';
export default (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  book.init({
    id:{
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
      type:Sequelize.INTEGER
    },
    name: {
      allowNull:false,
      type:Sequelize.STRING
       
    },
    userId:{
     allowNull:false,
     type:Sequelize.INTEGER
    },
    authorName:{
      allowNull:false,
      type:Sequelize.STRING
    },
    price:{
      allowNull:false,
      type:Sequelize.STRING
    },
    publishYear:{
      allowNull:false,
      type:Sequelize.INTEGER
    }
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};