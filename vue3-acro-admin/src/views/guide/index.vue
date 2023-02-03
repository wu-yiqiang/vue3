<template>
  <teleport to="body">
    <div v-if="show" ref="guideModalRef" class="guide-modal">
      <div ref="guideBoxRef" class="guide-box">
        <div>{{ message }}</div>
        <button class="btn" :disabled="index === 0" @click="changeStep(true)">
          上一步
        </button>
        <button class="btn" @click="changeStep(false)">下一步</button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue';
  import { selectors } from './utils';

  const props = defineProps({
    selectors: Array,
  });

  const guideModalRef = ref(null);
  const guideBoxRef = ref(null);

  const index = ref(0);
  const show = ref(true);
  let preNode = null;

  const message = computed(() => {
    return props.selectors[index.value]?.message;
  });

  const genGuide = (hasChange = true) => {
    // 所有指引完毕
    if (index.value > props.selectors.length - 1) {
      show.value = false;
      return;
    }

    // 修改上一个节点的 z-index
    if (preNode) preNode.style = `z-index: 0;`;

    // 获取目标节点信息
    preNode = document.querySelector(props.selectors[index.value].selector);
    const target = preNode;
    target.style = `
  position: relative; 
  z-index: 1000;
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
    isPre ? index.value-- : index.value++;
    genGuide();
  };

  onMounted(() => {
    genGuide();
  });
</script>

<template>
  <teleport to="body">
    <div v-if="show" ref="guideModalRef" class="guide-modal">
      <div ref="guideBoxRef" class="guide-box">
        <div>{{ message }}</div>
        <button class="btn" :disabled="index === 0" @click="changeStep(true)">
          上一步
        </button>
        <button class="btn" @click="changeStep(false)">下一步</button>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
  .guide-modal {
    position: fixed;
    z-index: 999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .guide-box {
    width: 150px;
    min-height: 10px;
    border-radius: 5px;
    background-color: #fff;
    position: absolute;
    transition: 0.5s;
    padding: 10px;
    text-align: center;
  }
  .btn {
    margin: 20px 5px 5px 5px;
  }
</style>
