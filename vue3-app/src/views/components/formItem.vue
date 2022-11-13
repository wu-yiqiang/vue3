<template>
  <section class="form-item">
    <label class="title-box">
      {{ title }}
      <span v-if="required" class="require-box">*</span>
    </label>
    <div class="slot-box">
      <slot />
    </div>
  </section>
</template>
<script lang="ts" setup name="formItem">
import { reactive, watch, computed, ref, toRefs, onMounted } from 'vue'
const props = defineProps({
  // name: {
  //   require: true,
  //   type: Number,
  //   default: () => 12
  // },
  title: {
    require: true,
    type: String,
    default: () => ''
  },
  required: {
    require: true,
    type: Boolean,
    default: true
  }
})
const { title } = toRefs(props)
// onMounted(() => {
//   console.log(title)
// })
</script>
<style lang="scss" scoped>
.form-item {
  margin-bottom: 10px;
  .title-box {
    height: 50px;
    display: flex;
    align-items: center;
    .require-box {
      color: red;
    }
  }
}
</style>
