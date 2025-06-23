import api from '@/lib/axios'

type Dashboard = {
    start_date?: string
    end_date?: string
    user_id?: number
}

export async function dashboard(params: Dashboard) {
    try {
        const res = await api.get("/dashboard", {
            params: params || {}
        })
        console.log(params);
        return res.data
    } catch (error) {
        console.log(error);
        throw new Error("Gagal dashboard")
    }
}