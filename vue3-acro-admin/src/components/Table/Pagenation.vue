<template>
  <div class="Pagenation">
    <a-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNumer"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
    >
    </a-pagination>
  </div>
</template>
<script lang="ts" setup>
import { computed, watch, defineEmits, ref } from 'vue';
const props = defineProps({
  pages: {
    required: true,
    type: Object,
    default: {},
  },
});
let pageNumer = ref(1);
let pageSize = ref(10);
let theme = ref('blue');
const emit = defineEmits(['pager-change']);
watch(
  () => props.pages,
  (value, oldValue) => {
    pageNumer.value = props.pages.pageNumer;
    pageSize.value = props.pages.pageSize;
  },
  { immediate: true }
);
const themeVars = computed(() => {
  let color = '';
  if (theme.value === 'blue') color = '#004F8F';
  if (theme.value === 'red') color = '#D63246';
  if (theme.value === 'golden') color = '#7A6E66';
  if (theme.value === 'blue') color = '#007C8A';
  return {
    '--theme': color,
  };
});
const handleSizeChange = (val) => {
  pageSize.value = val;
  pageNumer.value = 1;
  const page = { pageSize: pageSize.value, pageNumer: pageNumer.value };
  emit('pager-change', page);
};
const handleCurrentChange = (val) => {
  pageNumer.value = val;
  const page = { pageSize: pageSize.value, pageNumer: pageNumer.value };
  emit('pager-change', page);
};
</script>
<style lang="less" scoped>
.Pagenation {
  margin-top: 20px;
}
</style>
