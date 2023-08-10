
//一般JS运行时错误使用window.onerror捕获处理
const jsError =  window.addEventListener(
  "error",
  function (event) {
    // let lastEvent = getLastEvent();
    console.log('js Rrror');
    // 有 e.target.src(href) 的认定为资源加载错误
    if (event.target && (event.target.src || event.target.href)) {
      tracker.send({
        //资源加载错误
        kind: "stability", //稳定性指标
        type: "error", //resource
        errorType: "resourceError",
        filename: event.target.src || event.target.href, //加载失败的资源
        tagName: event.target.tagName, //标签名
        timeStamp: formatTime(event.timeStamp), //时间
        selector: getSelector(event.path || event.target), //选择器
      });
    } else {
      tracker.send({
        kind: "stability", //稳定性指标
        type: "error", //error
        errorType: "jsError", //jsError
        message: event.message, //报错信息
        filename: event.filename, //报错链接
        position: (event.lineNo || 0) + ":" + (event.columnNo || 0), //行列号
        stack: getLines(event.error.stack), //错误堆栈
        // selector: lastEvent
        //   ? getSelector(lastEvent.path || lastEvent.target)
        //   : "", //CSS选择器
      });
    }
  },
  true
); // true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以

export default jsError;