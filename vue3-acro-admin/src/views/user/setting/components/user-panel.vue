<template>
  <a-card :bordered="false">
    <img src="https://imgg-go.oss-cn-beijing.aliyuncs.com/.%2Fstorage%2Ffiles%2Fimage1699865584719-cmpr.jpg?Expires=1709905664&OSSAccessKeyId=LTAI5tPaFWokrKh9xxdgeefQ&Signature=zdK5tDvZ5jdQXqVSOzOc1EqY0lU%3D&x-oss-process=image%2Fformat%2Cpng" alt="">
    <a-space :size="54">
      <a-upload
        :custom-request="customRequest"
        list-type="picture-card"
        :file-list="fileList"
        :show-upload-button="true"
        :show-file-list="false"
        @change="uploadChange"
      >
        <template #upload-button>
          <a-avatar :size="100" class="info-avatar">
            <template #trigger-icon>
              <icon-camera />
            </template>
            <img v-if="fileList.length" :src="fileList[0].url" />
          </a-avatar>
        </template>
      </a-upload>
      <a-descriptions
        :data="renderData"
        :column="2"
        align="right"
        layout="inline-horizontal"
        :label-style="{
          width: '140px',
          fontWeight: 'normal',
          color: 'rgb(var(--gray-8))',
        }"
        :value-style="{
          width: '200px',
          paddingLeft: '8px',
          textAlign: 'left',
        }"
      >
        <template #label="{ label }">{{ $t(label) }} :</template>
        <template #value="{ value, data }">
          <a-tag
            v-if="data.label === 'userSetting.label.certification'"
            color="green"
            size="small"
          >
            已认证
          </a-tag>
          <span v-else>{{ value }}</span>
        </template>
      </a-descriptions>
    </a-space>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type {
    FileItem,
    RequestOption,
  } from '@arco-design/web-vue/es/upload/interfaces';
  import { useUserStore } from '@/store';
import { userUploadApi } from '@/api/user-center';
  import {updateAvator} from '@/api/user'
  import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

  const userStore = useUserStore();
  const file = {
    uid: '-2',
    name: 'avatar.png',
    url: userStore.avatar,
  };
  const renderData = [
    {
      label: 'userSetting.label.name',
      value: userStore.name,
    },
    {
      label: 'userSetting.label.certification',
      value: userStore.certification,
    },
    {
      label: 'userSetting.label.accountId',
      value: userStore.accountId,
    },
    {
      label: 'userSetting.label.phone',
      value: userStore.phone,
    },
    {
      label: 'userSetting.label.registrationDate',
      value: userStore.registrationDate,
    },
  ] as DescData[];
  const fileList = ref<FileItem[]>([file]);
  const uploadChange =  async (fileItemList: FileItem[], fileItem: FileItem) => {
    // fileList.value = [fileItem];
    // 本地上传
    const img = fileItem.file;
    const param = new FormData();
    param.append('file', img as any);
    let config = {
          headers:{'Content-Type':'multipart/form-data'} //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
        }; //添加请求头
    const { data } = await updateAvator(param, config)
    file.url = data.url
  };
  const customRequest = (options: RequestOption) => {
    // docs: https://axios-http.com/docs/cancellation
    const controller = new AbortController();

    (async function requestWrap() {
      const {
        onProgress,
        onError,
        onSuccess,
        fileItem,
        name = 'file',
      } = options;
      onProgress(20);
      const formData = new FormData();
      formData.append(name as string, fileItem.file as Blob);
      const onUploadProgress = (event: ProgressEvent) => {
        let percent;
        if (event.total > 0) {
          percent = (event.loaded / event.total) * 100;
        }
        onProgress(parseInt(String(percent), 10), event);
      };

      try {
        // https://github.com/axios/axios/issues/1630
        // https://github.com/nuysoft/Mock/issues/127

        const res = await userUploadApi(formData, {
          controller,
          onUploadProgress,
        });
        onSuccess(res);
      } catch (error) {
        onError(error);
      }
    })();
    return {
      abort() {
        controller.abort();
      },
    };
  };
</script>

<style scoped lang="less">
  .arco-card {
    padding: 14px 0 4px 4px;
    border-radius: 4px;
  }
  :deep(.arco-avatar-trigger-icon-button) {
    width: 32px;
    height: 32px;
    line-height: 32px;
    background-color: #e8f3ff;
    .arco-icon-camera {
      margin-top: 8px;
      color: rgb(var(--arcoblue-6));
      font-size: 14px;
    }
  }
</style>
