<template>
    <router-view />
    <NavBottom v-if="isShowNav"/>
</template>

<script setup>
import {ref} from 'vue'
import NavBottom from './views/navBottom.vue' //底部导航
import {mainStore} from '@/store/index'
import {storeToRefs} from 'pinia'

const store = mainStore();
const {isShowNav} = storeToRefs(store); //解构且响应式

</script>