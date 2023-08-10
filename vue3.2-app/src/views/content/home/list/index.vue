<template>
    <div class="main">
        <!-- 每日秒杀导航 -->
        <Nav />
        <!-- 列表数据 -->
        <Lists :products="products"/>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import Nav from './nav.vue'
import Lists from './lists.vue'
//import {getLists} from '@/utils/http'
import {productStore} from '@/store/product' //导入
import {storeToRefs} from 'pinia'
const store = productStore(); //实例化
const {products} = storeToRefs(store); //解构数据且数据是响应式


//方法一：当前组件发送请求
//let products = ref([]);
// onMounted(async ()=>{
//     let res = await getLists();
//     products.value = res.data.data;
// })

//方法二：请求是通过store
//let products = ref([]);
// onMounted(async ()=>{
//     let res = await store.getData();
//     products.value = res.data.data;
// })

//方法三：调用store中的方法
onMounted(async ()=>{
    await store.getData2();
})

</script>