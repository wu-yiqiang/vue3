<template>
  <div>
    <h1>vue3-Worker</h1>
    <button @click="openWorker">开启线程</button>
    <p>F12打开浏览器控制台查看效果</p>

    <hr />
    <button @click="makeWorker">开始线程</button>
    <!--在计算时 往input输入值时 没有发生卡顿-->
    <p><input type="text" /></p>
  </div>
</template>

<script setup>
import { onBeforeUnmount, reactive } from 'vue'
import Worker from 'worker-loader!@/workers/worker3'
const openWorker = () => {
  const worker = new Worker()
  worker.postMessage('开启线程')
  worker.onmessage = e => {
    console.log(e.data)
    setTimeout(() => {
      worker.postMessage('线程关闭')
      worker.terminate()
    }, 1000)
  }
}

// let arr = new Array(100000).fill(1).map(() => {Math.random()* 10000})
// let weightedList = new Array(100000).fill(1).map(() => {Math.random() * 10000})
let arr = new Array(1000000).fill(1).map(() => Math.random()* 10000);
let weightedList = new Array(1000000).fill(1).map(() => Math.random()* 10000);
let calcList = [
  {type: 'sum', name: '总和'},
  {type: 'average', name: '算术平均'},
  {type: 'weightedAverage', name: '加权平均'},
  {type: 'max', name: '最大'},
  {type: 'middleNum', name: '中位数'},
  {type: 'min', name: '最小'},
  {type: 'variance', name: '样本方差'},
  {type: 'popVariance', name: '总体方差'},
  {type: 'stdDeviation', name: '样本标准差'},
  {type: 'popStandardDeviation', name: '总体标准差'}
]
let workerList = reactive([])
const makeWorker = () => {
  calcList.forEach(item => {
    let workerName = `worker${workerList.length}`;
    let worker = new Worker();
    let start = performance.now();
    worker.postMessage({arr: arr, type: item.type, weightedList: weightedList});
    worker.onMessage = (e) => {
        worker.terminate();

        let tastName = '';
        calcList.forEach(item => {
            if(item.type === e.data.type) {
                item.value = e.data.value;
                tastName = item.name;
            }
        })

        let end = performance.now();
        let duration = end - start;
        console.log(`当前任务: ${tastName}, 计算用时: ${duration} 毫秒`);
    }
    workerList.push({ [workerName]: worker });
  })
}
const clearWorker = () => {
  if (workerList.length > 0) {
    workerList.forEach((item, key) => {
        item[`worker${key}`].terminate && item[`worker${key}`].terminate(); // 终止所有线程
    });
  }
}

// 页面关闭，如果还没有计算完成，要销毁对应线程
onBeforeUnmount(()  => {
  clearWorker()
})
</script>
