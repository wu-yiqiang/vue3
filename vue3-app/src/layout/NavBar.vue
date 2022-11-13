<template>
  <van-nav-bar left-arrow left-text="返回" v-bind="$attrs" @click-left="goBack" />
</template>

<script setup lang="ts">
import router from '/@/router/index'
function goBack() {
  router.go(-1)
}
function goTo() {
}
</script>

<style lang="scss" scoped></style>
