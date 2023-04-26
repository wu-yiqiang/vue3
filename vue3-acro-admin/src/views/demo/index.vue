<template>
  <div class="container"> sdawssad </div>
</template>

<script lang="ts" setup>
  import { BinaryTree } from '@/utils/tree';
  import { onMounted } from 'vue';
  
  onMounted(() => {
    const binTree = new BinaryTree(77, '阿达');
    binTree.createBinaryTree(89, '让他');
    binTree.createBinaryTree(34, '摄氏度');
    binTree.createBinaryTree(14, '看看i');
    binTree.createBinaryTree(56, '乱来');
    binTree.createBinaryTree(54, '暗示');
    binTree.createBinaryTree(58, 'sdd法');
    binTree.createBinaryTree(80, 'jkkk');
    binTree.createBinaryTree(85, 'ooo');
    binTree.createBinaryTree(78, 'ppp');
    binTree.createBinaryTree(99, '就');
    binTree.createBinaryTree(2, '多福多寿方式');
    console.log(binTree.removeTreeNode(56));
  });
</script>

<script lang="ts">
  export default {
    name: 'Demo1',
  };
</script>

<style scoped lang="less">
  .container {
    // padding: 0 20px 20px 20px;
    // :deep(.arco-list-content) {
    //   overflow-x: hidden;
    // }

    // :deep(.arco-card-meta-title) {
    //   font-size: 14px;
    // }
  }
</style>
