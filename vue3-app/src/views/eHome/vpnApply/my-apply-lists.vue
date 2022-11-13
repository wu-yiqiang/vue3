<template>
  <section class="my-apply-lists">
    <van-tabs sticky>
      <van-tab title="我的申请">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <List number="sre-123443" />
          <List number="sre-123443" />
          <List number="sre-123443" />
          <List number="sre-123443" />
          <List number="sre-154543" />
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </section>
</template>
<script lang="ts" setup>
import { reactive, watch, computed, ref } from 'vue'
import List from '/@/views/eHome/vpnApply/components/list.vue'
const loading = ref<boolean>(false)
function onRefresh() {
  loading.value = true
  loading.value = false
}
</script>
<style lang="scss" scoped>
.my-apply-lists {
  .van-tabs {
    width: 100%;
    ::v-deep .van-tabs__content {
      padding: $--left-right-padding20;
      .van-tab__panel {
        .list {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
