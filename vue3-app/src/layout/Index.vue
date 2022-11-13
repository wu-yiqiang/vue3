<template>
  <div class="t-layout">
    <NavBar :title="t(store.title as string)" />
    <div class="t-main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </keep-alive>
      </router-view>
    </div>
    <Tabbar v-if="store.tabbarShow as boolean" />
  </div>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue'
import { t } from '/@/plugins/i18n'
import Tabbar from './Tabbar.vue'
import { useAppStore } from '/@/store'
import { onMounted } from 'vue'
const store = useAppStore()
</script>

<style lang="scss" scoped>
.t-layout {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
