<template>
  <div class="user-box">
    <div class="select-box" @click.capture="toDetail($event.target.dataset.path)">
      <Item
        v-for="(ite, index) in items"
        :key="index"
        :path="ite.path"
        :name="ite.name"
        :title="ite.title"
        :icon-size="iconSize"
      />
    </div>
    <van-button type="primary" round block @click="handleLogout">{{ t('user.logout') }}</van-button>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'vant'
import Item from '/@/views/user/item.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { t } from '/@/plugins/i18n'
import { removeToken } from '/@/utils/auth'
const router = useRouter()
const iconSize = ref<string>('2em')
type params = {
  path: string
  name: string
  title: string
}
const items = reactive([
  { path: '/user/theme', name: 'theme', title: '主题' },
  { path: '/user/language', name: 'language', title: '语言' },
  { path: '/user/setting', name: 'setting', title: '设置' },
  { path: '/user/setting', name: 'setting', title: '其他' }
])

function handleLogout() {
  removeToken()
  router.replace('/login')
}
function toDetail(val: string) {
  console.log(val)
  if (!val) return Toast('该模块正在加紧开发中\n请耐心等待。。。')
  router.replace(val)
}
</script>

<style lang="scss" scoped>
.user-box {
  padding: $--all-padding20;
  .select-box {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 10px;
    flex-wrap: wrap;
    & .item {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #f0f0f0;
      border-radius: $--btn-border-radius;
    }
  }
}
</style>
