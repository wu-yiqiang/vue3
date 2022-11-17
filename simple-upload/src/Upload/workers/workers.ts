// 计算hash
onmessage = function (e) {
  let { arr, type, weightedList } = e.data
  let value = ''

  // 发送数据事件
  postMessage({ type, value })
}