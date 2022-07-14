import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000
})

export const testConnection = async () => {
    try {
        return await apiClient.get('/connection')
    } catch (exception) {
        return {
            error: true,
            exception
        }
    }
}
