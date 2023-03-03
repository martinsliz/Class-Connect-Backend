'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Class.init(
    {
      name: DataTypes.STRING,
      subject: DataTypes.STRING,
      description: DataTypes.STRING,
      semester: DataTypes.STRING,
      teacher: DataTypes.STRING,
      credits: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Class',
      tableName: 'classes'
    }
  )
  return Class
}
