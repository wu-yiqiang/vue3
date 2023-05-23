<template>
  <div class="t-layout">
    <NavBar v-if="store.navbarShow as boolean" :title="t(store.title as string)" />
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
const tabbar = store.tabbarShow
const navbar = store.navbarShow
</script>

<style lang="scss" scoped>
.t-layout {
  overflow: hidden;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .t-main {
    overflow-y: scroll;
    overflow-x: hidden;
    /* margin-bottom: 50px; */
    height: calc(100vh - 50px);
    /* @if $isTabbar && $isNavbar {
      height: calc(100vh - 50px - 46px);
    }
    @if $isTabbar {
      height: calc(100vh - 50px);
    }
    @if $isTabbar {
      height: calc(100vh - 46px);
    } */
    /* @if !$isTabbar && !$isNavbar {
      height: 100vh;
    } */
  }
  .van-tabbar {
    position: fixed;
    bottom: 0;
  }
}
</style>
