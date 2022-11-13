<template>
  <section class="item" :data-path="path">
    <SvgIcon
      class="t-form-label-icon"
      :name="name"
      color="var(--van-text-color)"
      :size="iconSize"
      :data-path="path"
    />
    {{ title }}
  </section>
</template>
<script lang="ts" setup>
import SvgIcon from '/@/components/SvgIcon.vue'
import { reactive, watch, computed, ref } from 'vue'
const props = defineProps({
  path: {
    require: true,
    type: String,
    default: () => ''
  },
  iconSize: {
    require: false,
    type: String,
    default: () => '1em'
  },
  name: {
    require: true,
    type: String,
    default: () => ''
  },
  title: {
    require: true,
    type: String,
    default: () => ''
  }
})
// eslint-disable-next-line vue/no-setup-props-destructure
const { name, iconSize, path, title } = props
</script>
<style lang="scss" scoped>
//.item{}
</style>
