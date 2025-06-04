'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pemasukan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.KategoriPemasukan, {
        foreignKey: 'kategori_pemasukan_id'
      })
    }
  }
  Pemasukan.init({
    kategori_pemasukan_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pemasukan',
    paranoid: true
  });
  return Pemasukan;
};