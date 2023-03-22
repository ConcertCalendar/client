import axios from "axios";


export const axiosInstance = axios.create({
    withCredentials:true,
    baseURL: 'https://concal.p-e.kr',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'},
});


