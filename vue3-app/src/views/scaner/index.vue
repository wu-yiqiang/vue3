<template>
  <div class="t-page">
    <div class="logo-box">
      <img src="../../assets/svg/qrcode.svg" alt="" />
    </div>
    <div class="scan">
      <div class="qrcode"></div>
      <div class="border">
        <div id="reader"></div>
      </div>
    </div>
    <div class="light-box">
      <img src="../../assets/svg/qrcode.svg" alt="" />
    </div>
    <div class="about-box">
      <img src="../../assets/svg/qrcode-about.svg" alt="" />
    </div>
    <div class="convert-box">
      <img src="../../assets/svg/OnlineConverter.svg" alt="" />
    </div>
    <div class="language-box">
      <img src="../../assets/svg/qrcode-language.svg" alt="" />
    </div>
    <div class="history-box">
      <img src="../../assets/svg/qrcode-history.svg" alt="" />
    </div>
    <div class="input-box">
      <img src="../../assets/svg/photo-camera.svg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, onUnmounted } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'
let html5QrCode = reactive(null)
let isShow = ref(false)
let devicesInfo = ref('')
onMounted(() => {
  getCameras()
})

onUnmounted(() => {
  stop()
})

const getCameras = () => {
  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        isShow.value = true
        html5QrCode = new Html5Qrcode('reader')
        // start开始扫描
        start()
      }
    })
    .catch((err) => {
      // handle err
      console.log('获取设备信息失败', err) // 获取设备信息失败
      // showToast('获取设备信息失败')
    })
}
const start = () => {
  console.log('ooo', html5QrCode)
  html5QrCode
    .start(
      { facingMode: 'environment' },
      {
        fps: 90, // 设置每秒多少帧
        qrbox: { width: 400, height: 400 } // 设置取景范围
        // scannable, rest shaded.
      },
      (decodedText: string, decodedResult: string) => {
        alert('扫码结果' + decodedText)
      },
      (errorMessage: string) => {
        console.log('暂无额扫描结果', errorMessage)
      }
    )
    .catch((err: string) => {
      console.log(`Unable to start scanning, error: ${err}`)
    })
}
const stop = () => {
  if (devicesInfo?.value) {
    html5QrCode
      .stop()
      .then((ignore: string) => {
        // QR Code scanning is stopped.
        console.log('QR Code scanning stopped.', ignore)
      })
      .catch((err: string) => {
        // Stop failed, handle it.
        console.log('Unable to stop scanning.', err)
      })
  }
}
</script>

<style lang="scss" scoped>
@mixin img-size {
  img {
    width: 35px;
    height: 35px;
  }
}
.t-page {
  height: calc(100% - 50px);
  // padding: 20px;
  overflow: hidden;
  background: #111;
  display: grid;
  justify-content: center;
  align-items: center;
  position: relative;
  .logo-box {
    position: absolute;
    left: 10px;
    top: 10px;
    @include img-size();
  }
  .input-box {
    position: absolute;
    right: 10px;
    bottom: 10px;
    @include img-size();
  }
  .about-box {
    position: absolute;
    left: 10px;
    bottom: 10px;
    @include img-size();
  }
  .light-box {
    @include img-size();
  }
  .convert-box {
    position: absolute;
    right: 10px;
    bottom: 150px;
    @include img-size();
  }
  .language-box {
    position: absolute;
    left: 10px;
    bottom: 150px;
    @include img-size();
  }
  .history-box {
    position: absolute;
    right: 50%;
    bottom: 10px;
    transform: translateX(50%);
    @include img-size();
  }
  .scan {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    border: 1px solid rgb(118, 113, 113);
    max-height: 40vh;
    max-width: 40vh;
    overflow: hidden;
    .qrcode {
      position: relative;
      width: 400px;
      height: 400px;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        animation: animate 4s ease-in-out infinite;
      }
      &::after {
        content: '';
        position: absolute;
        inset: 20px;
        width: 400px;
        height: 2px;
        background: #35fd5c;
        filter: drop-shadow(0 0 20px #35fd5c) drop-shadow(0 0 60px #35fd5c);
        animation: animate_line 4s ease-in-out infinite;
      }
    }

    .border {
      position: absolute;
      inset: 0px;
      background-size: 400px;
      background-repeat: no-repeat;
      animation: animate_text 0.5s linear infinite;
      #reader {
        width: 100%;
        height: 100%;
        video {
          width: 100%;
          height: 100%;
        }
      }
    }
    @keyframes animate {
      0%,
      100% {
        height: 20px;
      }
      50% {
        height: calc(100% - 20px);
      }
    }
    @keyframes animate_line {
      0%,
      100% {
        top: 20px;
      }
      50% {
        top: calc(100% - 20px);
      }
    }

    @keyframes animate_text {
      0%,
      100% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
    }
  }
}
</style>
