<template>
  <section class="list">
    <div class="number">
      {{ number }}
      <SvgIcon
        class="t-form-label-icon"
        name="copy"
        color="var(--van-text-color)"
        @click="handleCopy"
      />
    </div>
    <div class="user">
      <label>当前处理人：</label>
      王小儿
    </div>
    <div class="os">
      <label>本机操作系统：</label>
      Windows
    </div>
    <div class="date">
      <label>张三：</label>
      07月07日-07月14日
    </div>
  </section>
</template>
<script lang="ts" setup>
import SvgIcon from '/@/components/SvgIcon.vue'
import { reactive, watch, computed, ref, toRefs } from 'vue'
const props = defineProps({
  number: {
    require: true,
    type: String,
    default: () => ''
  }
})
const { number } = toRefs(props)
function handleCopy() {
  navigator.clipboard.writeText('ads')
}
</script>
<style lang="scss" scoped>
.list {
  padding: $--all-padding20;
  border: $--color-box-border;
  border-radius: $--btn-border-radius;
}
</style>
