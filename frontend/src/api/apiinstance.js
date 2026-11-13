import axios from 'axios';

const api = axios.create({
    baseURL: "https://complete-ecommerce-application.vercel.app"
})
export default api;