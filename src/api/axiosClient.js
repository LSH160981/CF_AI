import axios from 'axios'

const axiosClient = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: 'https://3335.xiaoliao.eu.org/',
});

export default axiosClient;