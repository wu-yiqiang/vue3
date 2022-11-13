<template>
  <section class="apply-notice">
    <div class="notice-box">
      <div>
        <p>
          （1）仅允许受疫情影响远程办公外源申请（其他原因不允许申请），
          需按照“最小授权，最短期限”的模式进行白名单管理，最长申请14天，特殊情况到期再延期，相关人员无需远程办公后，需即使申请撤销VPN权限，结束日期次日起将回收VPN权限。
        </p>
        <p>
          （2）请参考社区（http://wiki.sdc.icbc/x/X2llg）远程办公手册做好设备安全检查，验证可以正常VPN后再带离园。
        </p>
        <p>（3）远程办公用户可参考工软E家广告栏远程办公手册。</p>
      </div>
      <div class="submit-box">
        <van-button hairline type="primary" size="large" :disabled="!!count">
          同意
          <span v-if="count">({{ count }})</span>
        </van-button>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { reactive, watch, computed, ref, onMounted } from 'vue'
let count = ref<number | string>(10)
onMounted(() => {
  countDown()
})
function countDown() {
  let timer = setInterval(() => {
    count.value = count.value - 1
    if (count.value <= 0) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}
</script>
<style lang="scss" scoped>
.apply-notice {
  padding: $--left-right-padding20;
  .notice-box {
    height: 75vh;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: $--color-box-border;
    padding: $--all-padding20;
    border-radius: $--btn-border-radius;
    p {
      font-size: 20px;
      color: $--color-primary;
      text-align: justify;
      word-break: break-all;
    }
  }
}
</style>
