const { KategoriPemasukan } = require('../models')
const model = require('../models')

const getAllKategoriPemasukan = async (req, res) => {
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
    const allKategoriPemasukan = await KategoriPemasukan.findAll(options);
    return res.status(200).json({
        data: allKategoriPemasukan
    })
}

const addKategoriPemasukan = async (req, res) => {
    const {nama_kategori, user_id} = req.body
    const kategoriPemasukanData = {
        nama_kategori: nama_kategori,
        user_id: user_id
    }
    if (kategoriPemasukanData) {
        const addKategoriPemasukan = await KategoriPemasukan.create(kategoriPemasukanData)
        return res.status(201).json({
            data: kategoriPemasukanData
        })
    } else {
        return res.status(400).json({
            message: 'Bad Request'
        })
    }
}

const updateKategoriPemasukan = async (req, res) => {
    const {id} = req.params
    const {nama_kategori} = req.body
    const cariKategoriPemasukan = await KategoriPemasukan.findByPk(id)
    if (!cariKategoriPemasukan) {
        return res.status(400).json({
            message: 'Kategori pemasukan tidak ditemukan'
        })
    }
    if (nama_kategori) {
        cariKategoriPemasukan.nama_kategori = nama_kategori
    }
    const updatePemasukan = await cariKategoriPemasukan.save()
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

const deleteKategoriPemasukan = async (req, res) => {
    const {id} = req.params
    const cariKategoriPemasukan = await KategoriPemasukan.findByPk(id)
    if (cariKategoriPemasukan) {
        const deleteKategoriPemasukan = await cariKategoriPemasukan.destroy()
        return res.status(200).json({
            data: cariKategoriPemasukan
        })
    } else {
        return res.status(400).json({
            message: 'Gagal hapus'
        })
    }
}

module.exports = {
    getAllKategoriPemasukan,
    addKategoriPemasukan,
    updateKategoriPemasukan,
    deleteKategoriPemasukan
}