<template>
    <div class="c-wrap">
        <ul>
            <li v-for="v in products" :key="v.product_id">
                <div class="c-wrap-img">
                    <router-link :to="`/detail/${v.product_id}`">
                        <img :src="v.product_img_url"/>
                    </router-link>
                </div>
                <h4>{{v.product_name}}</h4>
                <div class="c-wrap-info">
                    <i>￥</i>
                    <b>{{v.product_uprice}}</b>
                    <span class="shoppingCart" @click="addProduct(v)">
                        <i class="iconfont icon-gouwuche"></i>
                    </span>
                </div>
            </li>
        </ul>
        
    </div>
</template>

<script setup>
import {ref,defineProps} from 'vue'
import {basketStore} from '@/store/basket'

const store = basketStore();
const {products} = defineProps({
    products:Array
})

function addProduct(v){
    v.count = 1; //添加数量属性
    store.addItem(v); //存储数据到pinia
}


</script>