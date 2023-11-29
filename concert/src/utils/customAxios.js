import axios from "axios";

export const axiosInstance = axios.create({
    withCredentials:true,
    baseURL: 'https://dev.pushpin.co.kr',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
});


