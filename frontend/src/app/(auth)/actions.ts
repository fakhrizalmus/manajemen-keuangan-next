import api from '@/lib/axios'

export async function login(data: {
    email: string,
    password: string
}) {
    try {
        const res = await api.post('/auth/login', data)
        localStorage.setItem('token', res.data.Token);
        window.location.href = "/";
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
        window.location.href = "/login";
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function logout() {
    try {
        localStorage.removeItem('token')
        window.location.href = "/login";
    } catch (error) {
        console.log(error);
        throw error
    }
}