//当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
const promiseError = window.addEventListener(
  'unhandledrejection',
  function (event) {
    console.log('prmose Rrror');
    let lastEvent = getLastEvent();
    let message = '';
    let line = 0;
    let column = 0;
    let file = '';
    let stack = '';
    if (typeof event.reason === 'string') {
      message = event.reason;
    } else if (typeof event.reason === 'object') {
      message = event.reason.message;
    }
    let reason = event.reason;
    if (typeof reason === 'object') {
      if (reason.stack) {
        var matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
        if (matchResult) {
          file = matchResult[1];
          line = matchResult[2];
          column = matchResult[3];
        }
        stack = getLines(reason.stack);
      }
    }
    tracker.send({
      //未捕获的promise错误
      kind: 'stability', //稳定性指标
      type: 'error', //jsError
      errorType: 'promiseError', //unhandledrejection
      message: message, //标签名
      filename: file,
      position: line + ':' + column, //行列
      stack,
      selector: lastEvent
        ? getSelector(lastEvent.path || lastEvent.target)
        : '',
    });
  },
  true
); // true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以
export default promiseError;