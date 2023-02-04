<template>
  <teleport to="body">
    <div v-if="show" ref="guideModalRef" class="guide-modal">
      <div ref="guideBoxRef" class="guide-box">
        <div>{{ message }}</div>
        <a-button class="btn" :disabled="index === 0" type='primary' @click="changeStep(true)" >上一步</a-button>
        <a-button class="btn" :disabled="index === 3" type='primary' @click="changeStep(false)" >下一步</a-button>
        <icon-close-circle-fill class="class-box" @click="close" />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { Selectors } from './utils';

  const props = defineProps({
    selectors: Array<Selectors>,
  });

  const guideModalRef = ref(null);
  const guideBoxRef = ref(null);

  const index = ref(0);
  const show = ref(true);
  let preNode: unknown = null;

  const message = computed(() => {
    return props.selectors?.selectors[index.value]?.message;
  });

  const genGuide = (hasChange = true) => {
    // console.log(hasChange);
    // 所有指引完毕
    if (index.value > props.selectors.length - 1) {
      show.value = false;
      return;
    }

    // 修改上一个节点的 z-index
    if (preNode) preNode.style = `z-index: 0;`;

    // 获取目标节点信息
    preNode = document.querySelector(
      props.selectors.selectors[index.value].selector
    );
    const target = preNode;
    target.style = `
  position: relative;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 100000;
  color: '';
  `;
    const { x, y, width, height } = target.getBoundingClientRect();

    // 指引相关
    if (guideBoxRef.value) {
      const halfClientHeight = guideBoxRef.value.clientHeight / 2;
      guideBoxRef.value.style = `
   left:${x + width + 10}px;
   top:${y <= halfClientHeight ? y : y - halfClientHeight + height / 2}px;
  `;
    }
  };

  // 页面内容发生变化时，重新计算位置
  window.addEventListener('resize', () => genGuide(false));
  window.addEventListener('scroll', () => genGuide(false));

  const changeStep = (isPre) => {
    if (isPre) {
      index.value -= 1;
    } else {
      index.value += 1;
    }
    genGuide();
  };

  const close = () => {
    console.log('关闭');
  };
  onMounted(() => {
    genGuide();
  });
</script>

<style lang="less" scoped>
  .guide-modal {
    position: fixed;
    z-index: 999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);

    .guide-box {
      width: 200px;
      min-height: 10px;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.9);
      position: absolute;
      transition: 0.5s;
      padding: 10px;
      text-align: center;

      .btn {
        margin: 20px 5px 5px 5px;
      }

      .class-box {
        position: absolute;
        top: 2px;
        right: 2px;
        color: rgb(var(--danger-7));
      }
    }
  }
</style>
