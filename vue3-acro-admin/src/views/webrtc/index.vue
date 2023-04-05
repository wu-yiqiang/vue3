<template>
  <section class="webrtc">
    <div class="screen-box">
      <video id="localVideo" autoplay playsinline muted></video>
      <div class="device-box">
        <div
          class="change-box">视频输入设备切换
          <a-select placeholder="Please select ...">
            <a-option>Beijing</a-option>
            <a-option>Shanghai</a-option>
            <a-option>Guangzhou</a-option>
            <a-option disabled>Disabled</a-option>
          </a-select></div
        >
        <div class="change-box"
          >音频输入设备切换
          <a-select placeholder="Please select ...">
            <a-option>Beijing</a-option>
            <a-option>Shanghai</a-option>
            <a-option>Guangzhou</a-option>
            <a-option disabled>Disabled</a-option>
          </a-select></div
        >
        <div class="change-box"
          >视频输出格式切换
          <a-select placeholder="Please select ...">
            <a-option v-for="item in videoFormateOutList">{{item}}</a-option>
          </a-select></div
        >
      </div>
      <div class="opeartion-box">
        <button @click="shareScreen">屏幕共享</button>
        <button>ada</button>
      </div>
    </div>

    <!-- <div v-for="(item, index) in imgList.length" :key="index" class="item">
      <img :src="item" alt="" />
    </div> -->
  </section>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
import { reactive, watch, computed, ref } from 'vue';
  let videoFormateOutList:string[] = reactive([])
  // 获取本地音视频流
  async function getLocalStream(constraints: MediaStreamConstraints) {
    // 获取媒体流
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // 将媒体流设置到 video 标签上播放
    playLocalStream(stream);
  }

  // 播放本地视频流
  function playLocalStream(stream: MediaStream) {
    const videoEl = document.getElementById('localVideo') as HTMLVideoElement;
    videoEl.srcObject = stream;
  }

  async function shareScreen() {
    let localStream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });
    // 播放本地视频流
    playStream(localStream);
  }

  // 在视频标签中播放视频流
  function playStream(stream: MediaStream) {
    const video = document.querySelector('#localVideo') as HTMLVideoElement;
    video.srcObject = stream;
  }
  // 获取支持的媒体类型
function getSupportedMimeTypes() {
  const media = 'video'
  // 常用的视频格式
  const types = ['webm', 'mp4', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'ts', 'x-matroska']
  // 常用的视频编码
  const codecs = ['vp9', 'vp9.0', 'vp8', 'vp8.0', 'avc1', 'av1', 'h265', 'h264']
  // 支持的媒体类型
  const supported: string[] = []
  const isSupported = MediaRecorder.isTypeSupported
  // 遍历判断所有的媒体类型
  types.forEach((type: string) => {
    const mimeType = `${media}/${type}`
    codecs.forEach((codec: string) =>
      [`${mimeType};codecs=${codec}`, `${mimeType};codecs=${codec.toUpperCase()}`].forEach((variation) => {
        if (isSupported(variation)) supported.push(variation)
      }),
    )
    if (isSupported(mimeType)) supported.push(mimeType)
  })
  return supported
}
  onMounted(() => {
    getLocalStream({
      audio: false,
      video: {
        width: 200,
        height: 200,
      },
    });
    videoFormateOutList = getSupportedMimeTypes()
  });
</script>
<style lang="less" scoped>
  .webrtc {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    .screen-box {
       display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 80%;
      video {
        height: 90%;
       
        border-radius:10px;
      }
      .device-box {
        display: flex;
        justify-content: space-between;
         margin: 30px  0;
        .change-box {
          display: flex;
          width: 33%;
        }
      }
      .opeartion-box {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
