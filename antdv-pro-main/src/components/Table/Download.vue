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
<style lang="less">
.Download {}
</style>