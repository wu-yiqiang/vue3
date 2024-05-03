<template>
  <Table ref="Table" :search-options="searchOptions" :table-Datas="list" :loading="loading" :pages="pages"
    :columnLists="columnLists" @search="handleSearch" @delete="handleDel" @editor="handleEditor">
    <template #searchOptLeft>
      <a-button type="primary" size="mini" icon="a-icon-download">导出</a-button>
      <a-button type="primary" size="mini" icon="a-icon-download">下载模板</a-button>
      <Download url="/api/getuserInfo" method="post" :params="params" />
    </template>
    <template #searchOptRight>
      <a-button type="primary" size="mini">asda1</a-button>
      <a-button type="primary" size="mini" icon="icon-log">日志</a-button>
    </template>
    <template #matainer="{ row }">
      <a-tooltip placement="bottom">
        <span>{{
          row.matainer ? `${row.matainer.split(',')[0]}...` : '--'
          }}</span>
        <div v-if="row.matainer" slot="content">
          <div v-for="(user, index) in row.matainer.split(',')" :key="index">
            {{ user }}
          </div>
        </div>
      </a-tooltip>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import Table from '@/components/Table/index.vue';
// // import Download from '@/components/Table/Download.vue';
let params = ref<object>({ a: 12, b: 14, c: 16 });
let pages = ref<object>({ pageSize: 10, pageNumer: 1, total: 134 });
let list = ref<object>([]);
let loading = ref<boolean>(false);
const columnLists = ref<object>([
  { prop: 'app', label: '应用名' },
  { prop: 'sn', label: 'SN号', width: 220 },
  { prop: 'deviceId', label: '设备号' },
  { prop: 'belongMonth', label: '所属月度' },
  { prop: 'belongEnv', label: '月度环境' },
  { prop: 'belongEnvs', label: '环境区分' },
  { prop: 'envType', label: '环境类型' },
  { prop: 'pass', label: '宿主机容器' },
  { prop: 'base', label: '所属研发部' },
  { prop: 'dept', label: '责任部门' },
  { slot: 'matainer', label: '运维人员', width: 180 },
  { prop: 'dutyer', label: '责任人', width: 150 },
  { prop: 'level', label: '运维等级' },
  { prop: 'date', label: '投产日期' },
  { slot: 'opts', label: '操作', width: 300 }
]);
const handleSearch = () => {
  console.log('sds')
}
// const handleSearch = ({ searchForm: any, pager: any }) => {
//   // console.log('asa', searchForm, pager, this.$refs.Table.getSearchParams());
//   // this.loading = true;
//   const item1 = {
//     sn: 'SER-201549625265266',
//     deviceId: Math.random() * 10000000,
//     app: 'F-OSP',
//     belongMonth: '20221123',
//     belongEnv: '功能环境',
//     belongEnvs: '正常',
//     envType: '功能环境D',
//     pass: '华为云',
//     base: '珠海',
//     dept: '系统二部',
//     level: 'A',
//     matainer: '***【000568789】,***【000568786】,***【000568787】',
//     dutyer: '***【555098898】',
//     date: '2023-06-23',
//   };
//   const item2 = {
//     sn: 'SER-201549621265267',
//     deviceId: Math.random() * 10000000,
//     app: 'F-AAM',
//     belongMonth: '20221906',
//     belongEnv: '回装环境',
//     belongEnvs: '灵活',
//     envType: '功能环境B',
//     pass: 'MYSQL',
//     base: '成都',
//     dept: '开发三部',
//     level: 'D',
//     matainer: '***【000568789】,***【000568786】,***【000568787】',
//     dutyer: '***【555098898】',
//     date: '2022-06-23',
//   };
//   const item3 = {
//     sn: 'SER-201549621265267',
//     deviceId: Math.random() * 10000000,
//     app: 'F-AAM',
//     belongMonth: '20221906',
//     belongEnv: '回装环境',
//     belongEnvs: '灵活',
//     envType: '功能环境B',
//     pass: 'MYSQL',
//     base: '成都',
//     dept: '开发四部',
//     level: 'B',
//     matainer: null,
//     dutyer: '***【555098898】',
//     date: '2022-06-23',
//   };
//   list.value = [item1, item2, item3];
// };
const remoteMethod = () => {
  console.log('输入选择');
};
const handleChange = () => {
  console.log('change');
};
const handleInput = () => {
  console.log('input');
};
const handleChange1 = () => {
  console.log('change1');
};
const handleInput2 = () => {
  console.log('input2');
};
const handleDept = (val) => {
  // console.log('责任部门', val);
  // const titem = this.searchOptions.find(v => v.prop === 'dept');
  // titem.opts = [{value: 'sys2', label: '系统二部'}, {value: 'sys1', label: '系统一部'}, {value: 'dev3', label: '开发三部'}, {value: 'dev2', label: '开发二部'}];
};
const handleDel = (row) => {
  console.log('最外层Del', row);
};
const handleEditor = (row) => {
  console.log('最外层Edit', row);
};
let searchOptions = ref([
  {
    prop: 'sn',
    label: 'SN号',
    type: 'input',
    default: 'SER-201549625265266',
    attrs: {
      clearable: true,
    },
  },
  {
    prop: 'deviceId',
    label: '设备编号',
    type: 'input',
    default: '4526589132565',
    required: true,
    attrs: {
      placeholder: '请输入',
      clearable: true,
    },
    rules: [
      { required: true, message: '请输入', trigger: ['blur', 'change'] },
    ],
    on: {
      input: handleInput,
    },
  },
  {
    prop: 'app',
    label: '应用名',
    type: 'input',
    default: 'F-OSP',
    required: true,
    attrs: {
      placeholder: '请输入',
      clearable: true,
    },
    rules: [
      { required: true, message: '请输入', trigger: ['blur', 'change'] },
    ],
    on: {
      input: handleInput,
    },
  },
  {
    prop: 'belongMonth',
    label: '所属月度',
    type: 'select',
    opts: [
      { value: '20221123', label: '20221123' },
      { value: '20221023', label: '20221023' },
      { value: '20220923', label: '20220923' },
      { value: '20230623', label: '20230623' },
    ],
    default: '20221123',
    attrs: {
      // placeholder: '请选择',
      remote: true,
      filterable: true,
      remoteMethod: remoteMethod,
    },
    on: {
      change: handleChange,
    },
  },
  {
    prop: 'belongEnv',
    label: '环境区分',
    type: 'select',
    opts: [
      { value: '功能环境', label: '功能环境' },
      { value: '回装环境', label: '回装环境' },
    ],
    default: '功能环境',
    attrs: {
      // placeholder: '请选择',
      clearable: true,
    },
    on: {
      change: handleChange1,
    },
  },
  {
    prop: 'belongEnvs',
    label: '环境区分',
    type: 'select',
    required: true,
    default: '正常',
    rules: [{ required: true, message: '必选', trigger: ['blur', 'change'] }],
    opts: [
      { value: '正常', label: '正常' },
      { value: '灵活', label: '灵活' },
    ],
    attrs: {
      placeholder: '请选择',
      clearable: true,
    },
  },
  {
    prop: 'envType',
    label: '环境类型',
    type: 'select',
    default: '功能环境D',
    opts: [
      { value: '功能环境D', label: '功能环境D' },
      { value: '功能环境A', label: '功能环境A' },
      { value: '功能环境B', label: '功能环境B' },
    ],
    attrs: {
      placeholder: '请选择',
    },
  },
  {
    prop: 'pass',
    label: '宿主机容器',
    type: 'select',
    default: '华为云',
    labelWidth: '90px',
    opts: [
      { value: 'paas', label: 'paas' },
      { value: 'vmware', label: 'vmware' },
      { value: 'mysql', label: 'mysql' },
      { value: '华为云', label: '华为云' },
    ],
    attrs: {
      // placeholder: '请选择',
    },
  },
  {
    prop: 'base',
    label: '所属研发部',
    type: 'select',
    default: '珠海',
    labelWidth: '90px',
    opts: [
      { value: '珠海', label: '珠海' },
      { value: '广州', label: '广州' },
      { value: '北京', label: '北京' },
      { value: '杭州', label: '杭州' },
    ],
    attrs: {
      // placeholder: '请选择',
      clearable: true,
    },
  },
  {
    prop: 'dept',
    label: '责任部门',
    type: 'select',
    default: ['sys2', 'sys1'],
    opts: [
      { value: 'sys2', label: '系统二部' },
      { value: 'sys1', label: '系统一部' },
      { value: 'dev3', label: '开发三部' },
      { value: 'dev2', label: '开发二部' },
    ],
    attrs: {
      placeholder: '请选择',
      multiple: true,
      remote: true,
    },
    on: {
      change: handleDept,
    },
  },
  {
    prop: 'level',
    label: '运维等级',
    type: 'select',
    default: 'A',
    opts: [
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
      { value: 'C', label: 'C' },
      { value: 'D', label: 'D' },
    ],
    attrs: {
      placeholder: '请选择',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'date2',
    label: '日期',
    type: 'range-date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'date',
    label: '投产日期',
    type: 'date',
    default: '2023-06-23',
    opts: [],
    attrs: {
      placeholder: '请选择日期',
    },
  },
]);
</script>

<style lang="less" scoped>
.chatHome {
  // margin-top: 20px;
  display: flex;

  .chatLeft {
    width: 280px;

    .title {
      color: #fff;
      padding-left: 10px;
    }

    .online-person {
      margin-top: 100px;

      .onlin-text {
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }

      .person-cards-wrapper {
        padding-left: 10px;
        height: 65vh;
        margin-top: 20px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;

        &::-webkit-scrollbar {
          width: 0;
          /* Safari,Chrome 隐藏滚动条 */
          height: 0;
          /* Safari,Chrome 隐藏滚动条 */
          display: none;
          /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 30px;

    .showIcon {
      position: absolute;
      top: calc(50% - 150px);
      /*垂直居中 */
      left: calc(50% - 50px);

      /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }
}
</style>
