// 这个文件是对 axios 的二次封装

import axios from 'axios'

const axiosClient = axios.create({
    // 由于是 中转服务器的原因，返回数据比较慢，这里我就把timeout关了
    // timeout: 5000
});

//请求拦截器:将来项目中【N个请求】，只要发请求,会触发请求拦截器!!! 在发送请求前 做一些事情
axiosClient.interceptors.request.use((config) => {
    // config中的headers很重要
    return config;
});

//响应拦截器：请求数据返回会执行
axiosClient.interceptors.response.use((res) => {
    //res:实质就是项目中发请求、服务器返回的数据
    return res.data;
}, (err) => {
    //失败的回调
    //  timeout of 5000ms exceeded  
    if (err.message.includes("timeout")) {
        return Promise.reject("服务器超时");
    }
    // 获取失败的信息 
    return Promise.reject(err.message);
});

export default axiosClient;