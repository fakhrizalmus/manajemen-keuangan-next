import api from '@/lib/axios'

export async function postKategoriPengeluaran(data: {
    nama_kategori: string
    user_id: number
}) {
    try {
        console.log(data);
        const res = await api.post("/kategori-pengeluaran", data)
        return res.data
    } catch (error) {
        console.error("Gagal menyimpan kategori pengeluaran", error)
        throw error
    }
}

type GetKategoriPengeluaranParams = {
    id?: number
}

export async function getKategoriPengeluaran(params: GetKategoriPengeluaranParams) {
    const res = await api.get("/kategori-pengeluaran", {
        params: params || {}
    })
    return res.data
}