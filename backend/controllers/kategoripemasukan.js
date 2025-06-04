const { KategoriPemasukan } = require('../models')
const model = require('../models')

const getAllKategoriPemasukan = async (req, res) => {
    let {page, row, id} = req.query
    page -= 1
    let where = {}

    if (id) {
        where.id = id
    }
    const options = {
        attributes: ['id', 'nama_kategori'],
        where,
    }
    if (page) options.limit = page;
    if (row) options.offset = row;
    const allKategoriPemasukan = await KategoriPemasukan.findAll(options);
    return res.status(200).json({
        data: allKategoriPemasukan
    })
}

const addKategoriPemasukan = async (req, res) => {
    const {nama_kategori} = req.body
    const kategoriPemasukanData = {
        nama_kategori: nama_kategori,
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
    getPemasukanById
}