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
        console.error("Gagal menyimpan pengeluaran", error)
        throw error
    }
}

export async function kategoriPengeluaran() {
    const res = await api.get("/kategori-pengeluaran")
    return res.data
}

type GetPengeluaranParams = {
    page?: number
    row?: number
    kategori_pengeluaran_id?: number
    id?: number
    start_date?: string
    end_date?: string
    user_id?: number
}

export async function getPengeluaran(params: GetPengeluaranParams) {
    const res = await api.get("/pengeluaran", {
        params: params || {},
    })
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

export async function putPengeluaran(data: {
    jumlah: number
    keterangan: string
    tanggal: string
    kategori_pengeluaran_id: number
    user_id: number
}, id: number) {
    try {
        console.log(data);
        console.log(id);
        const res = await api.put(`/pengeluaran/${id}`, data)
        return res.data
    } catch (error) {
        console.error("Gagal menyimpan pengeluaran", error)
        throw error
    }
}