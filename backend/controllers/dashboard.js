const {sequelize} = require('../models')

const dashboard = async (req, res) => {
    let {start_date, end_date} = req.query
    let user_id = req.user.id
    console.log(req.user.id);
    let where = `WHERE p.tanggal BETWEEN '${start_date}' AND '${end_date}'
    AND p.user_id = ${user_id}`

    const [countpemasukan] = await sequelize.query(
        `SELECT sum(jumlah) as jumlah from pemasukans
        WHERE tanggal BETWEEN '${start_date}' AND '${end_date}'
        AND user_id = ${user_id}`,
        {
            type: sequelize.QueryTypes.SELECT,
        }
    )

    const [countpengeluaran] = await sequelize.query(
        `SELECT sum(jumlah) as jumlah from pengeluarans 
        WHERE tanggal BETWEEN '${start_date}' AND '${end_date}'
        AND user_id = ${user_id}`,
        {
            type: sequelize.QueryTypes.SELECT,
        }
    )

    const pemasukan = await sequelize.query(
        `SELECT kp.nama_kategori, sum(p.jumlah) as total FROM pemasukans as p 
        JOIN kategoripemasukans as kp ON p.kategori_pemasukan_id = kp.id
        ${where}
        GROUP BY kp.id`,
        {
            type: sequelize.QueryTypes.SELECT,
        }
    )

    const pengeluaran = await sequelize.query(
        `SELECT kp.nama_kategori, sum(p.jumlah) as total FROM pengeluarans as p 
        JOIN kategoripengeluarans as kp ON p.kategori_pengeluaran_id = kp.id
        ${where}
        GROUP BY kp.id`,
        {
            type: sequelize.QueryTypes.SELECT,
        }
    )

    const persentase = Math.floor((Number(countpengeluaran.jumlah) * 100) / Number(countpemasukan.jumlah))

    if (pemasukan && pengeluaran) {
        return res.status(200).json({
            countpemasukan: Number(countpemasukan.jumlah),
            countpengeluaran: Number(countpengeluaran.jumlah),
            pemasukan: pemasukan,
            pengeluaran: pengeluaran,
            persentase: persentase
        })
    }
    return res.status(400).json({
        message: 'Gagal dashboard'
    })
}

module.exports = {
    dashboard
}