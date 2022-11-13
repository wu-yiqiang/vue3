<template>
  <section class="radioGroup" @click="handleClick($event.target.dataset.value)">
    <div v-for="(item, index) in lists" :key="index" class="item-box">
      <input
        v-model="radioValue"
        :class="item.value === radioValue ? 'check-box' : ''"
        type="radio"
        :value="item.value"
      />
      <label :class="item.value === radioValue ? 'check-box' : ''" :data-value="item.value">
        {{ item.label }}
        <div v-if="item.value === radioValue" class="triangle" />
      </label>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, defineEmits, defineProps } from 'vue'
const emit = defineEmits(['currentVal'])
const props = defineProps({
  lists: {
    require: true,
    type: Array,
    default: () => []
  },
  options: {
    require: false,
    type: Object,
    default: () => {}
  },
  defaultVal: {
    require: true,
    type: [Number, String],
    default: ''
  }
})
// eslint-disable-next-line vue/no-setup-props-destructure
const { lists, defaultVal } = props
let radioValue = ref<string | number>('')
const itemList = reactive([])
onMounted(() => {
  radioValue.value = defaultVal
  // lists.forEach(v => {
  //   // if (v[options.value]) itemList.push({value: v[options.value]})
  // })
})
function handleClick(val: string | number) {
  radioValue.value = val ?? ''
  emit('currentVal', radioValue.value)
}
</script>
<style lang="scss" scoped>
$box-height: 40px;
$border-color: rgb(113, 25, 254);
$unselect-color: #b4adad;
.radioGroup {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .item-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2px 0;
    margin-right: 5px;
    input {
      display: none;
    }
    input + label {
      display: block;
      color: $unselect-color;
      border: 1px solid $unselect-color;
    }
    .check-box {
      color: $border-color;
      background-color: #f0f0f0;
      border: 1px solid $border-color;
    }
    label {
      line-height: $box-height;
      height: $box-height;
      font-size: 14px;
      padding: 0px 20px;
      float: left;
      border-radius: 2px;
      text-align: center;
      position: relative;
      .triangle {
        position: absolute;
        bottom: 0;
        right: 0;
        display: block;
        width: 0px;
        height: 0px;
        border-left: $box-height / 2 solid transparent;
        border-bottom: $box-height / 2 solid $border-color;
        &::after {
          position: absolute;
          width: 0;
          height: 0;
          content: '✔';
          color: #fff;
          bottom: 7px;
          right: 12px;
        }
      }
    }
  }
}
</style>
