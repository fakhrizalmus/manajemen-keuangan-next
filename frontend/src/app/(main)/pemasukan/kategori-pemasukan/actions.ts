import api from '@/lib/axios'

export async function postKategoriPemasukan(data: {
    nama_kategori: string
}) {
    try {
        console.log(data);
        const res = await api.post("/kategori-pemasukan", data)
        return res.data
    } catch (error) {
        console.error("Gagal menyimpan kategori pemasukan", error)
        throw error
    }
}

type GetKategoriPemasukanParams = {
    id?: number
    user_id?: number
}

export async function getKategoriPemasukan(params: GetKategoriPemasukanParams) {
    const res = await api.get("/kategori-pemasukan", {
        params: params || {}
    })
    console.log(res.data);
    return res.data
}

export async function deleteKategoriPemasukan(id: number) {
    try {
        const res = await api.delete(`/kategori-pemasukan/${id}`)
        return res.data
    } catch (error) {
        console.log(error);
        throw new Error("Gagal Hapus");
    }
}

export async function putKategoriPemasukan(data: {
    nama_kategori: string
}, id: number) {
    try {
        const res = await api.put(`/kategori-pemasukan/${id}`, data)
        return res.data
    } catch (error) {
        console.log(error);
        throw new Error("Gagal Edit")
    }
}