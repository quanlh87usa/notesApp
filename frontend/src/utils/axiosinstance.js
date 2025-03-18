import axios from "axios"
import { BASE_URL } from "./constants"

const axiosInstance = axios.create({
    baseURL: "https://notesapp-server-lake.vercel.app:8000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://notesapp-server-lake.vercel.app:8000",
        "Access-Control-Allow-Credentials": true,
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config

    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
