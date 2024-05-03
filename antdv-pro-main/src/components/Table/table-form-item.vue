<template>
  <a-form-item v-for="(searchItem, index) in opts" :key="index" :prop="searchItem.prop" :label="searchItem.label"
    :label-width="searchItem.labelWidth" :rules="searchItem.rules" :required="searchItem.required" :content-flex="true">
    <a-input v-if="searchItem.type === 'input'" size="default" v-model.trim="searchForm[searchItem.prop]"
      v-bind="searchItem.attrs" v-on="searchItem.on" :placeholder="searchItem.attrs.placeholder
          ? searchItem.attrs.placeholder
          : `请输入${searchItem.label}`
        " />
    <a-select v-if="searchItem.type === 'select'" size="default" v-model="searchForm[searchItem.prop]"
      :rules="searchItem.rules" v-bind="searchItem.attrs" :placeholder="searchItem.attrs.placeholder
          ? searchItem.attrs.placeholder
          : `请选择${searchItem.label}`
        " v-on="searchItem.on">
      <a-option v-for="(optItem, i) in searchItem.opts" :key="i" :label="optItem.label" :value="optItem.value" />
    </a-select>
    <a-date-picker style="width: 100%;" v-if="searchItem.type === 'date'" v-model="searchForm[searchItem.prop]"
      type="date" size="default" v-bind="searchItem.attrs" v-on="searchItem.on" />
    <a-date-picker style="width: 100%;" v-if="searchItem.type === 'range-date'" v-model="searchForm[searchItem.prop]"
      type="daterange" size="small" range-separator="-" :start-placeholder="searchItem.attrs.startPlaceholder"
      :end-placeholder="searchItem.attrs.endPlaceholder" v-bind="searchItem.attrs" v-on="searchItem.on" />
  </a-form-item>
</template>

<script setup lang="ts">
const props = defineProps({
  opts: {
    required: true,
    type: Array,
    default: [],
  },
  searchForm: {
    required: true,
    type: Object,
    default: {},
  },
});
</script>
<style lang="less" scoped>
// .ant-form-item {
//   width: 25%;
// }
</style>
