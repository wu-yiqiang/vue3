<template>
  <div class="Table">
    <a-form ref="searchForm" :model="searchForm" :inline="true">
      <TableFormItem :opts="opts1" :search-form="searchForm" />
      <div v-if="opts.length" :class="foldState ? 'unfold' : 'fold'">
        <TableFormItem :opts="opts" :search-form="searchForm" />
      </div>
      <span v-if="isInline" class="inline-btn-box">
        <a-button size="large" type="primary" @click="handleQuery">
          搜索
        </a-button>
        <a-button size="large" @click="handleReset"> 重置 </a-button>
      </span>
      <div v-else class="btn-box">
        <a-button size="large" type="primary" @click="handleQuery">
          搜索
        </a-button>
        <a-button size="large" @click="handleReset"> 重置 </a-button>
        <a-button
          v-if="isFold && foldState"
          size="large"
          type="text"
          @click="handleUnfold"
        >
          展开
          <icon-down />
        </a-button>
        <a-button
          v-if="isFold && !foldState"
          size="large"
          type="text"
          @click="handleFold"
        >
          折叠
          <icon-up />
        </a-button>
      </div>
    </a-form>
    <div class="list" :loading="loading">
      <div class="opeartion">
        <div class="left-box">
          <slot name="searchOptLeft" />
        </div>
        <div class="right-box">
          <slot name="searchOptRight" />
        </div>
      </div>
      <a-table :data="tableDatas" style="width: 100%">
        <!-- <a-table-column
          v-for="(column, index) in columnLists"
          :key="index"
          :type="column.type"
          :prop="column.prop"
          :width="column.width"
          :label="column.label"
        >
          <template slot-scope="{ row }">
            <slot
              v-if="column.slot && column.slot !== 'opt'"
              :name="column.slot"
              :row="row"
            />
            <slot v-if="column.slot && column.slot === 'opt'" :name="'opt'">
              <a-button
                type="primary"
                size="mini"
                icon="a-icon-edit"
                @click="handleEditor(row)"
                >编辑</a-button
              >
              <a-button
                type="danger"
                size="mini"
                icon="a-icon-delete"
                @click="handleDelete(row)"
                >删除</a-button
              >
            </slot>
            <span v-if="!column.slot">{{ row[column.prop] }}</span>
          </template>
        </a-table-column> -->
      </a-table>
      <Pagenation
        v-if="tableDatas.length"
        :pages="page"
        @pager-change="handlePager"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, defineEmits, ref } from 'vue';
  import Pagenation from './Pagenation.vue';
  import TableFormItem from './table-form-item.vue';
  import { debounce } from 'lodash-es';
  const props = defineProps({
    searchOptions: {
      required: true,
      type: Array,
      default: [],
    },
    loading: {
      required: true,
      type: Boolean,
      default: true,
    },
    tableDatas: {
      required: true,
      type: Array,
      default: [],
    },
    columnLists: {
      required: true,
      type: Array,
      default: [],
    },
    pages: {
      required: true,
      type: Object,
      default: {},
    },
    defaultFoldNum: {
      required: false,
      type: Number,
      default: 4,
    },
  });
  const emit = defineEmits(['search', 'editor', 'update', 'delete']);
  let searchForm = ref({});
  let opts = ref([]);
  let opts1 = ref([]);
  let foldState = ref(true);
  let page = ref({
    pageNumer: 1,
    pageSize: 10,
    total: 0,
  });
  const isFold = computed(() => {
    if (props.searchOptions.length > props.defaultFoldNum) return true;
    return false;
  });
  const isInline = computed(() => {
    if (props.searchOptions.length < 4) return true;
    return false;
  });
  const init = () => {
    handleFold();
    handlePage();
    handleReset();
  };
  onMounted(() => {
    init();
  });
  const isDisplay = (index) => {
    if (props.defaultFoldNum === index) return true;
    return false;
  };

  const handlePage = () => {
    page.value = {
      pageNumer: props.pages.pageNumer,
      pageSize: props.pages.pageSize,
      total: props.pages.total,
    };
  };
  const handleQuery = debounce(function () {
    // this.$refs['searchForm'].validate((valid) => {
    //   if (!valid) return;
    //   this.$emit('search', { searchForm: this.searchForm, pager: this.page });
    // });
  }, 800);
  const handlePager = (pager) => {
    emit('search', { searchForm: searchForm.value, pager: pager });
  };
  const handleReset = () => {
    let form = {};
    for (const key in props.searchOptions) {
      if (Object.hasOwnProperty.call(props.searchOptions, key)) {
        const item = props.searchOptions[key];
        form[item.prop] = item.default;
      }
    }
    searchForm.value = form;
    handlePage();
    emit('search', { searchForm: searchForm.value, pager: page.value });
  };
  const handleFold = () => {
    foldState.value = true;
    const frist = props.searchOptions.slice(0, props.defaultFoldNum);
    opts1.value = [...frist];
    console.log('befo', opts1.value.length, opts.value.length);
    const second = props.searchOptions.slice(
      props.defaultFoldNum,
      props.searchOptions.length
    );
    opts.value = [...second];
    console.log('after', opts1.value.length, opts.value.length);
  };
  const handleUnfold = () => {
    foldState.value = false;
  };
  const getSearchParams = () => {
    return searchForm.value;
  };
  const handleUpdate = () => {
    emit('update', { searchForm: searchForm.value, pager: page.value });
  };
  const handleDelete = (item) => {
    emit('delete', item);
  };
  const handleEditor = (item) => {
    emit('editor', item);
  };
</script>
<style lang="less" scoped>
  .Table {
    .a-form {
      padding: 20px;
      margin-bottom: 20px;
      background-color: #fff;
      .fold {
        max-height: 800px;
        transition-timing-function: ease;
        overflow: hidden;
        transition: 1.6s;
      }
      .unfold {
        max-height: 0;
        transition-timing-function: ease;
        overflow: hidden;
        transition: 0.8s;
      }
      .a-form-item {
        width: 25%;
        margin-right: 0;
        display: inline-flex;
        label {
          margin-left: 10px;
          width: 80px;
        }
        .a-form-item__content {
          flex: 1;
          .a-select,
          .a-range-editor,
          .a-input {
            width: 100%;
          }
        }
      }
    }
    .inline-btn-box {
      margin-left: 30px;
    }
    .btn-box {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .List {
    width: 100%;
    padding: 20px;
    background-color: #fff;
    .opeartion {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .left-box,
      .right-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
</style>
