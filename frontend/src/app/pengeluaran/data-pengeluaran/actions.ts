import api from '@/lib/axios'

export async function postPengeluaran(data: {
    jumlah: number
    keterangan: string
    tanggal: string
    kategori_pengeluaran_id: number
    user_id: number
}) {
    try {
        const res = await api.post("/pengeluaran", data)
        return res.data
    } catch (error) {
        console.error("Gagal menyimpan pemasukan", error)
        throw error
    }
}

export async function kategoriPengeluaran() {
    const res = await api.get("/kategori-pengeluaran")
    return res.data
}