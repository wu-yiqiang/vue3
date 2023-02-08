let SDK = null // EasyAgentSDK 实例对象
const QUEUE = [] // 任务队列
cosnt NOOP = (v) => v

// 通过 web-vitals 页面性能指标
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry) // 布局偏移量
      getFID(onPerfEntry) // 首次输入延迟时间
      getFCP(onPerfEntry) // 首次内容渲染时间
      getLCP(onPerfEntry) // 首次最大内容渲染时间
      getTTFB(onPerfEntry) // 首个字节到达时间
    })
  }
}

export default class EasyAgentSDK {
  appId = ''
  baseUrl = ''
  timeOnPage = 0
  config = {}
  onPageShow = null
  onPagesHide = null
  
  constructor(options = {}) {
    if (SDK) return

    SDK = this
    this.appId = options.appId
    this.baseUrl = options.baseUrl || window.location.origin
    this.onPageShow = options.onPageShow || NOOP
    this.onPagesHide = options.onPagesHide || NOOP

    // 初始化监听页面变化
    this.listenPage()
  }
  
  // 设置 config
  setConfig(congfig){
    this.config = congfig
  }

  // 刷新任务队列
  flushQueue() {
    Promise.resolve().then(() => {
      QUEUE.forEach((fn) => fn())
      QUEUE.length = 0;
    })
  }

  // 监听页面变化
  listenPage() {
    let pageShowTime = 0

    window.addEventListener('pageshow', () => {
      pageShowTime = performance.now()
      
       // 页面性能指标上报
      reportWebVitals((data) => {
        this.performanceReport({ data })
      })
      
      // 执行 onPageShow
      this.onPageShow();
    })

    window.addEventListener('pagehide', () => {
      // 记录用户在页面停留时间
      this.timeOnPage = performance.now() - pageShowTime
      
      // 刷新队列前执行 onPageShow
      this.onPageShow();

      // 刷新任务队列
      this.flushQueue()
    })
  }

  // Json 转 FormData
  json2FormData(data){
    const formData = new FormData()

    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    });

    return formData
  }

  // 自定义上报类型
  report(config) {
    QUEUE.push(() => {
      const formData = json2FormData({
        ...this.config,
        ...config,
        time: new Date().toLocaleString(),
        appId: this.appId,
        pageUrl: window.location.href,
      });
      navigator.sendBeacon(`${this.baseUrl}${config.url || ''}`, formData)
    })
  }

  // 用户行为上报
  actionReport(config) {
    this.report({
      ...config,
      type: 'action',
    })
  }

  // 网络状况上报
  networkReport(config) {
    this.report({
      ...config,
      type: 'network',
    })
  }

  // 页面性能指标上报
  performanceReport(config) {
    this.report({
      ...config,
      type: 'performance',
    })
  }

  // 错误警告上报
  errorReport(config) {
    this.report({
      ...config,
      type: 'error',
    })
  }
}