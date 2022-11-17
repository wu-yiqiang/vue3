// addEventListener('message', e => {
//     const { data } = e
//     console.log(data)
//     setTimeout(() => {
//         return postMessage('线程完成')
//     }, 1000)
// })
// export default {}


onmessage = function (e) {
  // onmessage获取传入的初始值
  let sum = e.data
  for (let i = 0; i < 200000; i++) {
    for (let i = 0; i < 10000; i++) {
      sum += Math.random()
    }
  }
  // 将计算的结果传递出去
  postMessage(sum)
}



import { create, all } from 'mathjs'
const config = {
  number: 'BigNumber',
  precision: 20 // 精度
}
const math = create(all, config)

//加
const numberAdd = (arg1, arg2) => {
  return math.number(math.add(math.bignumber(arg1), math.bignumber(arg2)))
}
//减
const numberSub = (arg1, arg2) => {
  return math.number(math.subtract(math.bignumber(arg1), math.bignumber(arg2)))
}
//乘
const numberMultiply = (arg1, arg2) => {
  return math.number(math.multiply(math.bignumber(arg1), math.bignumber(arg2)))
}
//除
const numberDivide = (arg1, arg2) => {
  return math.number(math.divide(math.bignumber(arg1), math.bignumber(arg2)))
}

// 数组总体标准差公式
const popVariance = (arr) => {
  return Math.sqrt(popStandardDeviation(arr))
}

// 数组总体方差公式
const popStandardDeviation = (arr) => {
  let s,
    ave,
    sum = 0,
    sums = 0,
    len = arr.length
  for (let i = 0; i < len; i++) {
    sum = numberAdd(Number(arr[i]), sum)
  }
  ave = numberDivide(sum, len)
  for (let i = 0; i < len; i++) {
    sums = numberAdd(sums, numberMultiply(numberSub(Number(arr[i]), ave), numberSub(Number(arr[i]), ave)))
  }
  s = numberDivide(sums, len)
  return s
}

// 数组加权公式
const weightedAverage = (arr1, arr2) => {
  // arr1: 计算列，arr2: 选择的权重列
  let s,
    sum = 0, // 分子的值
    sums = 0, // 分母的值
    len = arr1.length
  for (let i = 0; i < len; i++) {
    sum = numberAdd(numberMultiply(Number(arr1[i]), Number(arr2[i])), sum)
    sums = numberAdd(Number(arr2[i]), sums)
  }
  s = numberDivide(sum, sums)
  return s
}

// 数组样本方差公式
const variance = (arr) => {
  let s,
    ave,
    sum = 0,
    sums = 0,
    len = arr.length
  for (let i = 0; i < len; i++) {
    sum = numberAdd(Number(arr[i]), sum)
  }
  ave = numberDivide(sum, len)
  for (let i = 0; i < len; i++) {
    sums = numberAdd(sums, numberMultiply(numberSub(Number(arr[i]), ave), numberSub(Number(arr[i]), ave)))
  }
  s = numberDivide(sums, len - 1)
  return s
}

// 数组中位数
const middleNum = (arr) => {
  arr.sort((a, b) => a - b)
  if (arr.length % 2 === 0) {
    //判断数字个数是奇数还是偶数
    return numberDivide(numberAdd(arr[arr.length / 2 - 1], arr[arr.length / 2]), 2) //偶数个取中间两个数的平均数
  } else {
    return arr[(arr.length + 1) / 2 - 1] //奇数个取最中间那个数
  }
}

// 数组求和
const sum = (arr) => {
  let sum = 0,
    len = arr.length
  for (let i = 0; i < len; i++) {
    sum = numberAdd(Number(arr[i]), sum)
  }
  return sum
}

// 数组平均值
const average = (arr) => {
  return numberDivide(sum(arr), arr.length)
}

// 数组最大值
const max = (arr) => {
  let max = arr[0]
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i]
    }
  }
  return max
}

// 数组最小值
const min = (arr) => {
  let min = arr[0]
  for (let i = 0; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i]
    }
  }
  return min
}

// 数组有效数据长度
// const count = (arr) => {
//   let remove = ['', ' ', null, undefined, '-'] // 排除无效的数据
//   return arr.filter((item) => !remove.includes(item)).length
// }

// 数组样本标准差公式
const stdDeviation = (arr) => {
  return Math.sqrt(variance(arr))
}

// 数字三位加逗号，保留两位小数
const formatNumber = (num, pointNum = 2) => {
  if ((!num && num !== 0) || num == '-') return '--'
  let arr = (typeof num == 'string' ? parseFloat(num) : num).toFixed(pointNum).split('.')
  let intNum = arr[0].replace(/\d{1,3}(?=(\d{3})+(.\d*)?$)/g, '$&,')
  return arr[1] === undefined ? intNum : `${intNum}.${arr[1]}`
}

onmessage = function (e) {
  let { arr, type, weightedList } = e.data
  let value = ''
  switch (type) {
    case 'sum':
      value = formatNumber(sum(arr))
      break
    case 'average':
      value = formatNumber(average(arr))
      break
    case 'weightedAverage':
      value = formatNumber(weightedAverage(arr, weightedList))
      break
    case 'max':
      value = formatNumber(max(arr))
      break
    case 'middleNum':
      value = formatNumber(middleNum(arr))
      break
    case 'min':
      value = formatNumber(min(arr))
      break
    case 'variance':
      value = formatNumber(variance(arr))
      break
    case 'popVariance':
      value = formatNumber(popVariance(arr))
      break
    case 'stdDeviation':
      value = formatNumber(stdDeviation(arr))
      break
    case 'popStandardDeviation':
      value = formatNumber(popStandardDeviation(arr))
      break
  }

  // 发送数据事件
  postMessage({ type, value })
}