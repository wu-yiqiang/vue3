import * as CryptoJS from 'crypto-js'

interface BcryptInterface {
  encrypt(value: string): string
  decrypt(value: string): string
}

export class Bcrypt implements BcryptInterface {
  SECRET_KEY = 'mySecretKey'
  // 加密
  encrypt(value: string) {
    const crypto = CryptoJS.AES.encrypt(value, this.SECRET_KEY).toString()
    return crypto
  }
  // 解密
  decrypt(value: string) {
    const encrypt = CryptoJS.AES.decrypt(value, this.SECRET_KEY).toString(CryptoJS.enc.Utf8)
    return encrypt
  }
}
