import axios from './request'

export function getLists(){  //首页列表
    return axios.get(`home/page/2/10`)
}

export function getDetail(obj){  //首页列表
    return axios({
        method:'get',
        url:'detail',
        params:obj
    })
}