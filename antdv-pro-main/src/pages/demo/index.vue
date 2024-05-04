<template>
  <Table ref="Table" :search-options="searchOptions" :tableDatas="list" :loading="loading" :pages="pages"
    :columns="columns" @search="handleSearch" @delete="handleDel" @editor="handleEditor">
    <template #searchOptLeft>
      <a-button type="primary" :size="default">
        <template #icon>
          <DownloadOutlined />
        </template>
        导出
      </a-button>
      <a-button type="primary" :size="default">
        <template #icon>
          <DownloadOutlined />
        </template>
        下载模版
      </a-button>
    </template>
    <template #searchOptRight>
      <a-button type="primary" :size="default">
        <template #icon>
          <DownloadOutlined />
        </template>
        日志
      </a-button>
    </template>
    <template #matainer="{ row }">
      <a-tooltip placement="bottom" >
        <span>{{
          row.matainer ? `${row.matainer.split(',')[0]}...` : '--'
        }}</span>
        <template #title>
          <div v-if="row.matainer" slot="content">
            <div v-for="(user, index) in row.matainer.split(',')" :key="index">
              {{ user }}
            </div>
          </div>
        </template>
      </a-tooltip>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Table from '~/components/Table/index.vue';
import { DownloadOutlined } from '@ant-design/icons-vue';
// // import Download from '@/components/Table/Download.vue';
let params = ref<object>({ a: 12, b: 14, c: 16 });
let pages = ref<object>({ pageSize: 10, pageNumer: 1, total: 134 });
let list = ref<object>([]);
let loading = ref<boolean>(false);
const columns = ref<object>([
  { key: 'app', title: '应用名', name: 'app', dataIndex: 'app', align: 'center', width: 180 },
  { key: 'sn', title: 'SN号', name: 'sn', dataIndex: 'sn', align: 'center', width: 300 },
  { key: 'deviceId', title: '设备号', name: 'deviceId', dataIndex: 'deviceId', align: 'center' },
  { key: 'belongMonth', title: '所属月度', name: 'belongMonth', dataIndex: 'belongMonth', align: 'center'},
  { key: 'belongEnv', title: '月度环境', name: 'belongEnv', dataIndex: 'belongEnv', align: 'center' },
  { key: 'belongEnvs', title: '环境区分', name: 'belongEnvs', dataIndex: 'belongEnvs', align: 'center' },
  { key: 'envType', title: '环境类型', name: 'envType', dataIndex: 'envType', align: 'center' },
  { key: 'pass', title: '宿主机容器', name: 'pass', dataIndex: 'pass', align: 'center' },
  { key: 'base', title: '所属研发部', name: 'base', dataIndex: 'base', align: 'center' },
  { key: 'dept', title: '责任部门', name: 'dept', dataIndex: 'dept', align: 'center' },
  { slot: 'matainer', title: '运维人员', name: 'matainer', dataIndex: 'matainer', align: 'center'},
  { key: 'dutyer', title: '责任人', name: 'dutyer', dataIndex: 'dutyer', align: 'center' },
  { key: 'level', title: '运维等级', name: 'level', dataIndex: 'level', align: 'center' },
  { key: 'date', title: '投产日期', name: 'date', dataIndex: 'date', align: 'center' },
  { slot: 'opt', title: '操作', name: 'opt', dataIndex: 'opt', align: 'center' }
]);
const handleSearch = ({ searchForm, pager }) => {
  const item1 = {
    sn: 'SER-201549625265266',
    deviceId: Math.random() * 10000000,
    app: 'F-OSP',
    belongMonth: '20221123',
    belongEnv: '功能环境',
    belongEnvs: '正常',
    envType: '功能环境D',
    pass: '华为云',
    base: '珠海',
    dept: '系统二部',
    level: 'A',
    matainer: '***【000568789】,***【000568786】,***【000568787】',
    dutyer: '***【555098898】',
    date: '2023-06-23',
  };
  const item2 = {
    sn: 'SER-201549621265267',
    deviceId: Math.random() * 10000000,
    app: 'F-AAM',
    belongMonth: '20221906',
    belongEnv: '回装环境',
    belongEnvs: '灵活',
    envType: '功能环境B',
    pass: 'MYSQL',
    base: '成都',
    dept: '开发三部',
    level: 'D',
    matainer: '***【000568789】,***【000568786】,***【000568787】',
    dutyer: '***【555098898】',
    date: '2022-06-23',
  };
  const item3 = {
    sn: 'SER-201549621265267',
    deviceId: Math.random() * 10000000,
    app: 'F-AAM',
    belongMonth: '20221906',
    belongEnv: '回装环境',
    belongEnvs: '灵活',
    envType: '功能环境B',
    pass: 'MYSQL',
    base: '成都',
    dept: '开发四部',
    level: 'B',
    matainer: null,
    dutyer: '***【555098898】',
    date: '2022-06-23',
  };
  [item1, item2, item3].forEach((item) => {
    list.value.push(item)
  });
  console.log('search', searchForm, pager)
}
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

<style lang="less" scoped></style>
