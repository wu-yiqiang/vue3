<template>
    <div>
        <button  @click="goBack">返回</button>
       <div class="other-title">
            <div class="other-text" v-for="v in infoData" :key="v.product_id">
                <img :src="v.product_img_url"/>
                <p> ￥：{{v.product_uprice}}</p>
                <p>{{v.product_name}}</p>
                <p>{{v.product_detail}}</p>
             </div>
       </div>
    </div>
</template>

<script setup>
import {ref,onMounted, onUnmounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {getDetail} from '@/utils/http'
import {mainStore} from '@/store/index'

const store = mainStore();
const router = useRouter();
const route = useRoute();

const infoData = ref([]);

onMounted(()=>{
    console.log(route.params.id);
    getDetailData(route.params.id)
    //底部导航隐藏
    store.$patch(state=>{
        state.isShowNav = false
    });
})
onUnmounted(()=>{
    //底部导航显示
    store.$patch(state=>{
        state.isShowNav = true
    });
})

async function getDetailData(id){
    let res = await getDetail({mId:id});
    console.log(res);
    infoData.value = res.data[1]; 
}

function goBack(){
    router.push('/home')
}
</script>