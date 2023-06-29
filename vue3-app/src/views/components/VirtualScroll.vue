<template>
  <section class="virtual-box">
    <div class="virtual-scroller" :style="{ height: 600 + 'px' }" @scroll="onScroll">
      <div class="phantom" :style="{ height: dataLength * itemHeight + 'px' }">
        <ul :style="{ 'margin-top': `${scrollTop}px` }">
          <li
            v-for="item in visibleList"
            :key="item.brandId"
            :style="{ height: `${itemHeight}px`, 'line-height': `${itemHeight}px` }"
          >
            <div>
              <div>{{ item.name ?? '---' }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { throttle } from 'lodash-es'
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
let itemHeight = ref<number>(100)
let visibleCount = ref<number>(10)
let dataLength = ref<number>(500000)
let startIndex = ref<number>(0)
let endIndex = ref<number>(10)
let scrollTop = ref<number>(0)

const dataList = computed(() => {
  const newDataList = [...Array(dataLength.value || 0).keys()].map((v, i) => ({
    brandId: i + 1,
    name: `第${i + 1}项SADSA`,
    height: itemHeight
  }))
  console.log('lemn', newDataList)
  return newDataList
})

const visibleList = computed(() => {
  return dataList.value.slice(startIndex.value, endIndex.value)
})

const onScroll = throttle((e: any) => {
  const eScrollTop = e.target.scrollTop
  scrollTop.value = eScrollTop
  console.log('scrollTop', eScrollTop)
  startIndex.value = Math.ceil(eScrollTop / itemHeight.value)
  endIndex.value = startIndex.value + 10
  console.log('scrollTop', eScrollTop, startIndex.value, endIndex.value)
}, 800)
</script>
<style lang="scss" scoped>
.virtual-box {
  .virtual-scroller {
    border: solid 1px #963737;
    // margin-top: 10px;
    // height: 600px;
    overflow: auto;
    .phantom {
      overflow: hidden;
      ul {
        background: #ccc;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        outline: solid 1px #fff;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
