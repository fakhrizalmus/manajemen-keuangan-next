const {sequelize} = require('../models')

const dashboard = async (req, res) => {
    let {start_date, end_date} = req.query

    const [pemasukan] = await sequelize.query(
        `SELECT sum(jumlah) as jumlah from pemasukans
        WHERE tanggal BETWEEN '${start_date}' AND '${end_date}'`,
        {
            type: sequelize.QueryTypes.SELECT,
        }
    )

    const [pengeluaran] = await sequelize.query(
        `SELECT sum(jumlah) as jumlah from pengeluarans 
        WHERE tanggal BETWEEN '${start_date}' AND '${end_date}'`,
        {
            type: sequelize.QueryTypes.SELECT,
        }
    )

    if (pemasukan && pengeluaran) {
        return res.status(200).json({
            pemasukan: Number(pemasukan.jumlah),
            pengeluaran: Number(pengeluaran.jumlah)
        })
    }
    return res.status(400).json({
        message: 'Gagal'
    })
}

module.exports = {
    dashboard
}