'use strict'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ MeetGreet, SetTime }) {
      // meet and greets
      Users.hasMany(MeetGreet, {
        foreignKey: "users_id",
        as: "meet_greets"
      })

      // set times 
      Users.hasMany(SetTime, {
        foreignKey: "users_id",
        as: "set_times"
      })
    }
  }
  Users.init({
    users_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: false
  })
  return Users
}