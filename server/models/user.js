'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/passwordHelper')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate : {
        isEmail : {
          args : true,
          msg : 'email has been taken'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "password is required"
        }
      }
    }
},{
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (user) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};