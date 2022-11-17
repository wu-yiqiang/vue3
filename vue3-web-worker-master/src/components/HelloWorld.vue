<template>
    <div>
        <button @click="makeWorker">开始绘图</button>
        <canvas id="myCanvas" width="300" height="150"></canvas>
    </div>
</template>

<script setup>
import Worker from 'worker-loader!@/workers/worker'
function makeWorker() {
    let worker = new Worker();
    let htmlCanvas = document.getElementById("myCanvas");
    // 使用canvas的transferControlToOffscreen函数获取一个OffscreenCanvas对象
    let offscreen = htmlCanvas.transferControlToOffscreen();
    // 注意：第二个参数不能省略
    worker.postMessage({canvas: offscreen}, [offscreen]);
}
</script>