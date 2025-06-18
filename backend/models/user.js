'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.KategoriPemasukan, {
        foreignKey: 'user_id'
      })
      this.hasMany(models.KategoriPengeluaran, {
        foreignKey: 'user_id'
      })
      this.hasMany(models.Pemasukan, {
        foreignKey: 'user_id'
      })
      this.hasMany(models.Pengeluaran, {
        foreignKey: 'user_id'
      })
    }
  }
  User.init({
    google_id: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (nasabah, options) => {
        nasabah.password = bcrypt.hashSync(nasabah.password, salt);
        return nasabah
      }
    }
  });
  return User;
};