const { Pemasukan } = require('../models')
const model = require('../models')

const getAllPemasukan = async (req, res) => {
    let {page, row, kategori_pemasukan_id, id} = req.query
    page -= 1

    const where = {}
    if (kategori_pemasukan_id) {
        where.kategori_pemasukan_id = kategori_pemasukan_id
    }
    if (id) {
        where.id = id
    }
    const options = {
        attributes: ['id', 'jumlah', 'tanggal', 'keterangan'],
        include: [
            {
                model: model.KategoriPemasukan,
                attributes: ['nama_kategori']
            },
        ],
        where,
        order: [
            ['tanggal', 'DESC']
        ]
    }
    if (page) options.limit = page;
    if (row) options.offset = row;

    const allPemasukan = await Pemasukan.findAll(options);
    return res.status(200).json({
        data: allPemasukan
    })
}

const addPemasukan = async (req, res) => {
    const {kategori_pemasukan_id, user_id, jumlah, tanggal, keterangan} = req.body
    const pemasukanData = {
        kategori_pemasukan_id: kategori_pemasukan_id,
        user_id, user_id,
        jumlah: jumlah,
        tanggal: tanggal,
        keterangan: keterangan
    }
    if (pemasukanData) {
        const addPemasukan = await Pemasukan.create(pemasukanData)
        return res.status(201).json({
            data: pemasukanData
        })
    } else {
        return res.status(400).json({
            message: 'Bad Request'
        })
    }
}

const updatePemasukan = async (req, res) => {
    const {id} = req.params
    const {kategori_pemasukan_id, user_id, jumlah, tanggal, keterangan} = req.body
    const cariPemasukan = await Pemasukan.findByPk(id)
    if (!cariPemasukan) {
        return res.status(400).json({
            message: 'Pemasukan tidak ditemukan'
        })
    }
    if (kategori_pemasukan_id) {
        cariPemasukan.kategori_pemasukan_id = kategori_pemasukan_id
    }
    if (user_id) {
        cariPemasukan.user_id = user_id
    }
    if (jumlah) {
        cariPemasukan.jumlah = jumlah
    }
    if (tanggal) {
        cariPemasukan.tanggal = tanggal
    }
    if (keterangan) {
        cariPemasukan.keterangan = keterangan
    }
    const updatePemasukan = await cariPemasukan.save()
    if (updatePemasukan) {
        return res.status(200).json({
            data: updatePemasukan
        })
    } else {
        return res.status(400).json({
            message: 'Gagal update'
        })
    }
}

const deletePemasukan = async (req, res) => {
    const {id} = req.params
    const cariPemasukan = await Pemasukan.findByPk(id)
    if (cariPemasukan) {
        const deletePemasukan = await cariPemasukan.destroy()
        return res.status(200).json({
            data: cariPemasukan
        })
    } else {
        return res.status(400).json({
            message: 'Gagal hapus'
        })
    }
}

module.exports = {
    getAllPemasukan,
    addPemasukan,
    updatePemasukan,
    deletePemasukan,
}