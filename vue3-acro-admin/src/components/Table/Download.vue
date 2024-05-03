<template>
  <a-button class='Download' :type='type' :size='size' icon='a-icon-download' :loading='loading' @click='handleDownload'>{{loading ? `${text}中` : text}}</a-button>
</template>
<script>
import {debounce} from 'lodash';
export default {
  name: 'Download',
  components: {},
  props: {
    url: {
      required: true,
      type: String,
      default: '',
    },
    method: {
      required: true,
      type: String,
      default: 'get',
    },
    params: {
      required: false,
      type: Object,
      default: () => {},
    },
    data: {
      required: false,
      type: Object,
      default: () => {},
    },
    beforeDownload: {
      required: false,
      type: Function,
      default: () => {},
    },
    text: {
      required: false,
      type: String,
      default: '导出',
    },
    type: {
      required: false,
      type: String,
      default: 'primary',
    },
    size: {
      required: false,
      type: String,
      default: 'mini',
    },
  },
  mixins: [],
  data () {
    return {
      loading: false,
    };
  },
  computed: {
  },
  watch: {},
  created () { },
  mounted () {
    this.init();
  },
  methods: {
    init () { },
    handleDownload: debounce(function () {
      if (this.loading) return;
      this.loading = true;
      if (this.beforeDownload) this.beforeDownload();
      let url = this.url;
      if (Object.keys(this.params).length) {
        const keys = Object.keys(this.params);
        const values = Object.values(this.params);
        url += keys.reduce((pre, current, index) => {
          // eslint-disable-next-line no-return-assign
          return pre += `${current}=${values[index]}&`;
        }, '?').split('').slice(0, -1).join('');
      }
      // eslint-disable-next-line no-console
      console.log('click', url);
      this.loading = false;
      this.$emit('done');
    }, 800),
  },
};
</script>
<style lang="scss">
.Download {}
</style>
 67 changes: 67 additions & 0 deletions67  
yudao-ui-admin/src/components/Table/Pagenation.vue
@@ -0,0 +1,67 @@
<template>
  <div class='Pagenation'>
    <a-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange'
      :current-page.sync='pageNumer' :page-sizes='[10, 30, 50, 100]' :page-size='pageSize'
      layout='total, sizes, prev, pager, next, jumper' :total='pages.total'>
    </a-pagination>
  </div>
</template>
<script>
export default {
  name: 'Pagenation',
  components: {},
  props: {
    pages: {
      required: true,
      type: Object,
      default: {},
    },
  },
  mixins: [],
  data () {
    return {
      pageNumer: 1,
      pageSize: 10,
      theme: 'blue',
    };
  },
  computed: {
    themeVars () {
      let color = '';
      if (this.theme === 'blue') color = '#004F8F';
      if (this.theme === 'red') color = '#D63246';
      if (this.theme === 'golden') color = '#7A6E66';
      if (this.theme === 'blue') color = '#007C8A';
      return {
        '--theme': color,
      };
    },
  },
  watch: {
    pages () {
      this.pageNumer = this.pages.pageNumer;
      this.pageSize = this.pages.pageSize;
    },
  },
  mounted () {
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val;
      this.pageNumer = 1;
      const page = {pageSize: this.pageSize, pageNumer: this.pageNumer};
      this.$emit('pager-change', page);
    },
    handleCurrentChange (val) {
      this.pageNumer = val;
      const page = {pageSize: this.pageSize, pageNumer: this.pageNumer};
      this.$emit('pager-change', page);
    },
  },
};
</script>
<style lang="scss">
.Pagenation {
  margin-top: 20px;
}
</style>
<template>
  <div class='Table'>
    <a-form ref='searchForm' :model='searchForm' :inline='true'>
      <TableFormItem :opts='opts1' :search-form='searchForm' />
      <div v-if='opts.length' :class='foldState ? "unfold" : "fold"'>
        <TableFormItem :opts='opts' :search-form='searchForm' />
      </div>
      <span v-if='isInline' class='inline-btn-box'>
        <a-button size='large' type='primary' @click='handleQuery'> 搜索 </a-button>
        <a-button size='large' @click='handleReset'> 重置 </a-button>
        <!-- slot -->
      </span>
      <div v-else class='btn-box'>
        <a-button size='large' type='primary' @click='handleQuery'> 搜索 </a-button>
        <a-button size='large' @click='handleReset'> 重置 </a-button>
        <a-button v-if='isFold && foldState' size='large' type='text' @click='handleUnfold'> 展开<i class='a-icon-arrow-down' />
        </a-button>
        <a-button v-if='isFold && !foldState' size='large' type='text' @click='handleFold'> 折叠<i class='a-icon-arrow-up' />
        </a-button>
        <!-- slot -->
      </div>
    </a-form>
    <!-- List -->
    <div class='List' v-loading='loading'>
      <!-- List operation -->
      <div class='opeartion'>
        <div class='left-box'>
          <slot name='searchOptLeft' />
        </div>
        <div class='right-box'>
          <slot name='searchOptRight' />
        </div>
      </div>
      <a-table :data='tableDatas' style='width: 100%'>
        <a-table-column v-for='(column, index) in columns' :key='index' :type='column.type' :prop='column.prop'
          :width='column.width' :label='column.label'>
          <template slot-scope='{row}'>
            <slot v-if='column.slot && column.slot !== "opt"' :name='column.slot' :row='row' />
            <slot v-if='column.slot && column.slot === "opt"' :name='"opt"'>
              <a-button type='primary' size='mini' icon='a-icon-edit' @click='handleEditor(row)'>编辑</a-button>
              <a-button type='danger' size='mini' icon='a-icon-delete' @click='handleDelete(row)'>删除</a-button>
            </slot>
            <span v-if='!column.slot'>{{row[column.prop]}}</span>
          </template>
        </a-table-column>
      </a-table>
      <Pagenation v-if='tableDatas.length' :pages='page' @pager-change='handlePager' />
    </div>
  </div>
</template>

<script>
import Pagenation from './Pagenation.vue';
import TableFormItem from './table-form-item.vue';
import {debounce} from 'lodash';
export default {
  name: 'Table',
  components: {Pagenation, TableFormItem},
  props: {
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
    columns: {
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
  },
  mixins: [],
  data () {
    return {
      searchForm: {},
      opts: [],
      opts1: [],
      foldState: true,
      page: {
        pageNumer: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  computed: {
    isFold () {
      if (this.searchOptions.length > this.defaultFoldNum) return true;
      return false;
    },
    isInline () {
      if (this.searchOptions.length < 4) return true;
      return false;
    },
  },
  watch: {},
  created () { },
  mounted () {
    this.init();
  },
  methods: {
    isDisplay (index) {
      if (this.defaultFoldNum === index) return true;
      return false;
    },
    init () {
      this.handleFold();
      this.handlePage();
      this.handleReset();
    },
    handlePage () {
      this.page = {pageNumer: this.pages.pageNumer, pageSize: this.pages.pageSize, total: this.pages.total};
      console.log('kkk', this.page);
    },
    handleQuery: debounce(function () {
      console.log('query  params');
      this.$refs['searchForm'].validate(valid => {
        if (!valid) return;
        this.$emit('search', {searchForm: this.searchForm, pager: this.page});
      });
    }, 800),
    handlePager (pager) {
      this.$emit('search', {searchForm: this.searchForm, pager: pager});
    },
    handleReset () {
      let form = {};
      for (const key in this.searchOptions) {
        if (Object.hasOwnProperty.call(this.searchOptions, key)) {
          const item = this.searchOptions[key];
          form[item.prop] = item.default;
        }
      }
      this.searchForm = form;
      this.handlePage();
      this.$emit('search', {searchForm: this.searchForm, pager: this.page});
    },
    handleFold () {
      this.foldState = true;
      this.opts1 = this.searchOptions.slice(0, this.defaultFoldNum);
      this.opts = this.searchOptions.slice(this.defaultFoldNum, this.searchOptions.length);
    },
    handleUnfold () {
      this.foldState = false;
    },
    getSearchParams () {
      return this.searchForm;
    },
    handleUpdate () {
      this.$emit('update', {searchForm: this.searchForm, pager: this.page});
    },
    handleDelete (item) {
      this.$emit('delete', item);
    },
    handleEditor (item) {
      this.$emit('editor', item);
    },
  },
};
</script>
<style lang="scss">
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