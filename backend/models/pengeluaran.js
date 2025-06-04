'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengeluaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.KategoriPengeluaran, {
        foreignKey: 'kategori_pengeluaran_id'
      })
    }
  }
  Pengeluaran.init({
    kategori_pengeluaran_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pengeluaran',
    paranoid: true
  });
  return Pengeluaran;
};