import axios from "axios";

const service = axios.create({
    baseURL:'http://139.196.42.209:3012/'
});
service.interceptors.request.use(config=>config);

service.interceptors.response.use(res=>{
    return res
},err=>{
    return Promise.reject(err)
})

export default service;