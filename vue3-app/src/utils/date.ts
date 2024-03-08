class Dates {
  timeStamp: Date
  fomater: string
  constructor(timeStamp: number, fomater: string) {
    this.timeStamp = new Date(timeStamp)
    this.fomater = fomater
  }
  getMonth() {
    return this.timeStamp.getMonth() + 1
  }
  getYear() {
    return this.timeStamp.getFullYear()
  }
  getHour() {
    return this.timeStamp.getHours()
  }
  getMinutes() {
    return this.timeStamp.getMinutes()
  }
  getSecond() {
    return this.timeStamp.getSeconds()
  }
  getDay() {
    return this.timeStamp.getDay()
  }
  getTime() {}
  str2Stamp(date: string) {
    const stamp = new Date(date)
    return stamp
  }
  isAfter(timeStamp: Date, timeStamp2: Date) {
    if (timeStamp < timeStamp2) return false
    return true
  }
}
