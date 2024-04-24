'use strict';
import { Model, Sequelize } from 'sequelize';
export default (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
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
    email:{
        allowNull:false,
        type:Sequelize.STRING
    },
    password:{
        allowNull:false,
        type:Sequelize.STRING
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};