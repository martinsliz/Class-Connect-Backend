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
      Class.belongsToMany(models.User, {
        as: 'students',
        through: models.ClassList,
        foreignKey: 'class_id'
      })
      Class.hasMany(models.Comments, { as: 'comments', foreignKey: 'class_id' })
      // define association here
    }
  }
  Class.init(
    {
      name: DataTypes.STRING,
      subject: DataTypes.STRING,
      description: DataTypes.TEXT,
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
