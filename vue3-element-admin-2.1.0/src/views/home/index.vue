<template>
  <!-- <div class="home">home{{ Ref }}</div>
  <div class="home">unerf{{ Unref }}</div>
  <div class="home">effect{{ count }}</div> -->
  <button @click="openWorker">开启线程</button>
  <p>F12打开浏览器控制台查看效果</p>
</template>

<script setup>
import {
  defineComponent,
  reactive,
  ref,
  unref,
  readonly,
  watchEffect,
} from 'vue'
import Worker from 'worker-loader'
// export default defineComponent({
function openWorker() {
  const worker = new Worker()
  worker.postMessage('开启线程')
  worker.onmessage = e => {
    console.log(e.data)
    setTimeout(() => {
      worker.postMessage('线程关闭')
      worker.terminate()
    }, 1000)
  }
}
// })
</script>

<style lang="scss" scoped>
.home {
  color: $mainColor;
}
</style>
