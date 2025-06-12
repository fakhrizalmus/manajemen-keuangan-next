import api from '@/lib/axios'

export async function postPengeluaran(data: {
    jumlah: number
    keterangan: string
    tanggal: string
    kategori_pengeluaran_id: number
    user_id: number
}) {
    try {
        console.log(data);
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

export async function getPengeluaran() {
    const res = await api.get("/pengeluaran")
    return res.data
}

export async function deletePengeluaran(id: number) {
    try {
        const res = await api.delete(`/pengeluaran/${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}