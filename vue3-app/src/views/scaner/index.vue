<template>
  <div class="demo">asasdada</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { Storages } from '@/utils/storages'
import { getAttr } from './index'
onMounted(() => {
  const storages = new Storages('sessionStoage')
  storages.set('你好', 'nihaoya')
  console.log(storages.get('你好'))
  getAttr()
})
</script>
<style lang="scss" scoped>
.demo {
  color: #fff;
}
</style>
