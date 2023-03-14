import axios from "axios";


export const baseInstance = axios.create({
    withCredentials:true,
    baseURL: 'https://concal.p-e.kr/',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'},
});

export const authInstance = (accessToken) => axios.create({
    withCredentials : true, 
    baseURL : 'https://concal.p-e.kr/',
    timeout: 5000,
    headers: {'Content-Type': 'application/json' , 
              'Authorization' : accessToken, 
            },
})

