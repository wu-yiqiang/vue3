<template>
    <div class="basket">
        <ul>
            <li v-for="v in basketItems" :key="v.product_id">
                <div class="basket-img">
                    <img :src="v.product_img_url"/>
                </div>
                <div class="basket-list">
                    <span>{{v.product_name}}</span>
                    <span>￥：{{v.product_uprice}}</span>
                    <span>数量：{{v.count}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {basketStore} from '@/store/basket'
import {storeToRefs} from 'pinia'

const store = basketStore();
const {basketItems} = storeToRefs(store); //解构且响应式

</script>