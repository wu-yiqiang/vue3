<template>
    <div class="main-item1">
        <div class="m-item1-left">
            <img src="@/assets/image/m1.jpg" alt="">
        </div>
        <div class="m-item1-right">
            <ul>
                <li v-for="(v,i) in _data" :key="i">
                    <div class="i1-img">
                        <img :src="`/src/assets/image/${v}`" >
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {ref,reactive} from 'vue'

const _data = ref([
     'm2.jpg','m3.jpg','m4.jpg','m5.jpg'
 ])


</script>