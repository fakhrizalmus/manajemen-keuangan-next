const { Pengeluaran } = require('../models')
const model = require('../models')

const getAllPengeluaran = async (req, res) => {
    let {page, row, kategori_pengeluaran_id, id} = req.query
    page -= 1

    const where = {}
    if (kategori_pengeluaran_id) {
        where.kategori_pengeluaran_id = kategori_pengeluaran_id
    }
    if (id) {
        where.id = id
    }
    const options = {
        attributes: ['id', 'jumlah', 'tanggal', 'keterangan'],
        include: [
            {
                model: model.KategoriPengeluaran,
                attributes: ['nama_kategori']
            },
        ],
        where,
    }
    if (page) options.limit = page;
    if (row) options.offset = row;

    const allPengeluaran = await Pengeluaran.findAll(options);
    return res.status(200).json({
        data: allPengeluaran
    })
}

const addPengeluaran = async (req, res) => {
    const {kategori_pengeluaran_id, user_id, jumlah, tanggal, keterangan} = req.body
    const pengeluaranData = {
        kategori_pengeluaran_id: kategori_pengeluaran_id,
        user_id, user_id,
        jumlah: jumlah,
        tanggal: tanggal,
        keterangan: keterangan
    }
    if (pengeluaranData) {
        const addPengeluaran = await Pengeluaran.create(pengeluaranData)
        return res.status(201).json({
            data: pengeluaranData
        })
    } else {
        return res.status(400).json({
            message: 'Bad Request'
        })
    }
}

const updatePengeluaran = async (req, res) => {
    const {id} = req.params
    const {kategori_pengeluaran_id, user_id, jumlah, tanggal, keterangan} = req.body
    const cariPengeluaran = await Pengeluaran.findByPk(id)
    if (!cariPengeluaran) {
        return res.status(400).json({
            message: 'Pengeluaran tidak ditemukan'
        })
    }
    if (kategori_pengeluaran_id) {
        cariPengeluaran.kategori_pengeluaran_id = kategori_pengeluaran_id
    }
    if (user_id) {
        cariPengeluaran.user_id = user_id
    }
    if (jumlah) {
        cariPengeluaran.jumlah = jumlah
    }
    if (tanggal) {
        cariPengeluaran.tanggal = tanggal
    }
    if (keterangan) {
        cariPengeluaran.keterangan = keterangan
    }
    const updatePengeluaran = await cariPengeluaran.save()
    if (updatePengeluaran) {
        return res.status(200).json({
            data: updatePengeluaran
        })
    } else {
        return res.status(400).json({
            message: 'Gagal update'
        })
    }
}

const deletePengeluaran = async (req, res) => {
    const {id} = req.params
    const cariPengeluaran = await Pengeluaran.findByPk(id)
    if (cariPengeluaran) {
        const deletePengeluaran = await cariPengeluaran.destroy()
        return res.status(200).json({
            data: cariPengeluaran
        })
    } else {
        return res.status(400).json({
            message: 'Gagal hapus'
        })
    }
}

module.exports = {
    getAllPengeluaran,
    addPengeluaran,
    updatePengeluaran,
    deletePengeluaran,
}