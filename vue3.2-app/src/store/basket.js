import {defineStore} from 'pinia'

export const basketStore = defineStore('basket',{
    state:()=>({
        basketItems:[]
    }),
    getters:{
        getCount(state){
            return state.basketItems.reduce((total,cur)=>total+cur.count,0)
        }
    },
    actions:{
        addItem(item){
            //this.basketItems.push(item);  //添加数据
            if(this.basketItems.length>0){
                let list = this.basketItems.filter(v=>v.product_id==item.product_id);
                if(list.length>0){
                    list[0].count+=1;
                    return;
                }else {
                    this.basketItems.push(item);  //添加数据
                }
            }else {
                this.basketItems.push(item);  //添加数据
            }
        }
    },
    persist:{  //数据持久化
        enabled:true
    }
})