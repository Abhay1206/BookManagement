'use strict';

import bookModel from './book.js'
import userModel from './user.js'
import sequelize from '../service/sequelize.js'
import { Sequelize } from 'sequelize';
const db = {};

const BookModel = bookModel(sequelize,Sequelize)
const UserModel = userModel(sequelize,Sequelize)
db[BookModel.name]=BookModel
db[UserModel.name]=UserModel

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db
