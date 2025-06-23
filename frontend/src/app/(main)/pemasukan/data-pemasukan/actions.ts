import api from '@/lib/axios'

export async function postPemasukan(data: {
    jumlah: number
    keterangan: string
    tanggal: string
    kategori_pemasukan_id: number
    user_id: number
}) {
    try {
        console.log(data);
        const res = await api.post("/pemasukan", data)
        return res.data
    } catch (error) {
        console.error("Gagal menyimpan pemasukan", error)
        throw error
    }
}

export async function kategoriPemasukan() {
    const res = await api.get("/kategori-pemasukan")
    return res.data
}

type GetPemasukanParams = {
    page?: number
    row?: number
    kategori_pemasukan_id?: number
    id?: number
    start_date?: string
    end_date?: string
    user_id?: number
}

export async function getPemasukan(params: GetPemasukanParams) {
    const res = await api.get("/pemasukan", {
        params: params || {},
    })
    return res.data
}

export async function deletePemasukan(id: number) {
    try {
        const res = await api.delete(`/pemasukan/${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export async function putPemasukan(data: {
    jumlah: number
    keterangan: string
    tanggal: string
    kategori_pemasukan_id: number
    user_id: number
}, id: number) {
    try {
        console.log(data);
        console.log(id);
        const res = await api.put(`/pemasukan/${id}`, data)
        return res.data
    } catch (error) {
        console.error("Gagal menyimpan pemasukan", error)
        throw error
    }
}