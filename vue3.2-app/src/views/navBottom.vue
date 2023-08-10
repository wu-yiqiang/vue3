<template>
    <div>
        <div class="footer"></div>
        <div class="footer-seat">
            <div class="footer-lists">
                <ul>
                    <li v-for="v in items" :key="v.path">
                        <router-link :to="v.path">
                            <i class="iconfont" :class="v.icon"></i>
                            <span>{{v.title}}</span>
                        </router-link>
                        <span class="count" v-show="v.path=='/shopping'">{{getCount}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {items} from '../utils/pulicData' //引入外部数据
import {basketStore} from '@/store/basket'
import {storeToRefs} from 'pinia'

const store = basketStore();
const {getCount} = storeToRefs(store);
</script>

<style>
.footer-lists li .active {
    color: #32aaa9;
}
</style>