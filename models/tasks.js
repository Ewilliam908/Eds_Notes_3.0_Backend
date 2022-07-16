'use strict'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Description }) {
      // DESCRIPTION
      Users.hasMany(Description , {
        foreignKey: "tasks_id",
        as: "description"
      })
    }
  }
  tasks.init({
    tasks_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
    
  }, {
    sequelize,
    modelName: 'Tasks',
    tableName: 'tasks',
    timestamps: false
  })
  return Tasks
}