const { KategoriPengeluaran } = require('../models')
const model = require('../models')

const getAllKategoriPengeluaran = async (req, res) => {
    let {page, row, id} = req.query
    let where = {}

    if (id) {
        where.id = id
    }
    const options = {
        attributes: ['id', 'nama_kategori'],
        where,
        order: [
            ['id', 'DESC']
        ]
    }
    if (page) options.offset = parseInt(page);
    if (row) options.limit = parseInt(row) || 10;
    const allKategoriPengeluaran = await KategoriPengeluaran.findAll(options);
    return res.status(200).json({
        data: allKategoriPengeluaran
    })
}

const addKategoriPengeluaran = async (req, res) => {
    const {nama_kategori, user_id} = req.body
    const kategoriPengeluaranData = {
        nama_kategori: nama_kategori,
        user_id: user_id
    }
    if (kategoriPengeluaranData) {
        const addKategoriPengeluaran = await KategoriPengeluaran.create(kategoriPengeluaranData)
        return res.status(201).json({
            data: kategoriPengeluaranData
        })
    } else {
        return res.status(400).json({
            message: 'Bad Request'
        })
    }
}

const updateKategoriPengeluaran = async (req, res) => {
    const {id} = req.params
    const {nama_kategori} = req.body
    console.log(req.body);
    const cariKategoriPengeluaran = await KategoriPengeluaran.findByPk(id)
    if (!cariKategoriPengeluaran) {
        return res.status(400).json({
            message: 'Kategori pengeluaran tidak ditemukan'
        })
    }
    if (nama_kategori) {
        cariKategoriPengeluaran.nama_kategori = nama_kategori
    }
    const updatePengeluaran = await cariKategoriPengeluaran.save()
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

const deleteKategoriPengeluaran = async (req, res) => {
    const {id} = req.params
    const cariKategoriPengeluaran = await KategoriPengeluaran.findByPk(id)
    if (cariKategoriPengeluaran) {
        const deleteKategoriPengeluaran = await cariKategoriPengeluaran.destroy()
        return res.status(200).json({
            data: cariKategoriPengeluaran
        })
    } else {
        return res.status(400).json({
            message: 'Gagal hapus'
        })
    }
}

module.exports = {
    getAllKategoriPengeluaran,
    addKategoriPengeluaran,
    updateKategoriPengeluaran,
    deleteKategoriPengeluaran
}