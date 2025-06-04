'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KategoriPemasukan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Pemasukan, {
        foreignKey: 'kategori_pemasukan_id'
      })
    }
  }
  KategoriPemasukan.init({
    nama_kategori: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KategoriPemasukan',
    paranoid: true
  });
  return KategoriPemasukan;
};