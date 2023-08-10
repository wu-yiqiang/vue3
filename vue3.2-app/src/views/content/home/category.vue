<template>
    <div class="nav"> 
        <ul>
            <li v-for="(v,i) in categoryData" :key="i">
                <img :src="`/src/assets/image/${v.img}`"/>
                <p>{{v.title}}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {categoryData} from '@/utils/pulicData' //引入外部数据


</script>