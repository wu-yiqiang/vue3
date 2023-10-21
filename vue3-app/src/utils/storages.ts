import { Bcrypt } from './bcrypt'
enum StorageType {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage'
}
interface IStoredItem {
  value: any
  expires?: number
}
export class Storages {
  storage: Storage
  PREFIX = 'vue3-app'
  IS_DEV = false
  bcrypt = new Bcrypt()
  constructor(type: StorageType) {
    this.storage = type === 'localStorage' ? window.localStorage : window.sessionStorage
  }

  private encrypt(data: string) {
    return this.bcrypt.encrypt(data)
  }

  private decrypt(data: string) {
    return this.bcrypt.decrypt(data)
  }

  private synthesisKey(key: string) {
    return this.PREFIX + key
  }

  set(key: string, value: any, expires: boolean | number = false, encryption = true) {
    const source: IStoredItem = { value: null }
    if (expires) {
      source.expires =
        new Date().getTime() + (expires === true ? 1000 * 60 * 60 * 24 * 365 : expires)
    }
    source.value = value
    const data = JSON.stringify(source)
    this.storage.setItem(
      this.synthesisKey(key),
      this.IS_DEV ? data : encryption ? this.encrypt(data) : data
    )
  }
  get(key: string, encryption = true) {
    const value = this.storage.getItem(this.synthesisKey(key))
    let realValue = ''
    if (value) {
      if (encryption && !this.IS_DEV) {
        realValue = this.decrypt(value)
      } else {
        realValue = value
      }
      const source: IStoredItem = JSON.parse(realValue)
      const expires = source.expires
      const now = new Date().getTime()
      if (expires && now > expires) {
        this.delete(key)
        return null
      }

      return source.value
    }
  }

  delete(key: string) {
    this.storage.removeItem(this.synthesisKey(key))
  }

  clear() {
    this.storage.clear()
  }
}
