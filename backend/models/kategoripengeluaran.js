'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KategoriPengeluaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Pengeluaran, {
        foreignKey: 'kategori_pengeluaran_id'
      })
    }
  }
  KategoriPengeluaran.init({
    nama_kategori: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'KategoriPengeluaran',
    paranoid: true
  });
  return KategoriPengeluaran;
};