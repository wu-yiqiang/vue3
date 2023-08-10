import {defineStore} from 'pinia'

export const mainStore = defineStore('main',{
    state:()=>({
        isShowNav:true, //底部导航显示与隐藏
    })
})