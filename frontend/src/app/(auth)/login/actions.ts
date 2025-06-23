import api from '@/lib/axios'

export async function login(data: {
    name: string,
    password: string
}) {
    try {
        const res = await api.post('/auth/login', data)
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function register(data: {
    name: string,
    email: string,
    password: string
}) {
    try {
        const res = await api.post('/auth/register', data)
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}