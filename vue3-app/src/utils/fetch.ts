type paramsType = {
  [key: string]: any
}
class FectRequest {
  // static headers: Object
  // constructor() { }

  // 对象转字符串
  private obj2Str(params: null): null
  private obj2Str(params: paramsType): string
  private obj2Str(params: paramsType | null) {
    if (typeof params === null) return null
    if (typeof params === 'object') {
      const keys = Object.keys(params) ?? []
      if (!keys?.length) return null
      // console.log('sad', Object.entries(params))
      // return Object.entries(params).reduce((pre, [key, value]) => {
      //   return `${pre}${key}=${value}&`
      // }, '?').slice(0, -1)
      let str = '?'
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const value = params[key]
          str += `${key}=${value}&`
        }
      }
      return str.slice(0, -1)
    }
  }
  // GET请求
  public async get(url: string, params: paramsType | null) {
    const queryParamsStr = this.obj2Str(params)
    const newUrl = params && queryParamsStr ? url + queryParamsStr : url
    const response = await fetch(url, { method: 'get' })
  }
  // POST请求
  public async post(url: string, params: paramsType | null, data: paramsType) {
    const queryParamsStr = this.obj2Str(params)
    const newUrl = params && queryParamsStr ? url + queryParamsStr : url
    const response = await fetch(newUrl, { method: 'post', body: JSON.stringify(data) })
    console.log('postResponse', newUrl)
  }
  // DELETE请求
  public delete() {}
}

const fetchs = new FectRequest()
console.log('oooo', fetchs.post('/sada', null, { a: 12 }))
