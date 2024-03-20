import * as SparkMD5 from "spark-md5"


// CPU核心数
const maximumThreadsNumber = window.navigator.hardwareConcurrency || 4;
interface UploadModel {
  // 当前正在传输的文件名、当前传输的文件大小、当前文件已传输文件大小
  transCurrentFile(): object
  // 总文件大小、总数量、已传输大小、已传输数量
  transTotalFiles(): object
  // 获取文件分块
  getFileChunk(file: object): string
}

export class Upload implements UploadModel {
  private mutilFiles: Object //  文件名
  private currentFileName: string // 文件名
  private currentTotalSize: number // 当前文件大小
  private currentTransSize: number // 当前文件已传输大小
  private totalSize: number // 总文件大小
  private totalNum: number // 总文件数量
  private totalTransNum: number // 已传输数量
  private totalTransSize: number // 已传输大小
  constructor(files: object) {
    this.mutilFiles = files
  }
  transCurrentFile(): object {
    throw new Error('Method not implemented.')
  }
  transTotalFiles(): object {
    throw new Error('Method not implemented.')
  }
  
  // 获取文件分块
  getFileChunk(file: object): Promise {
    return new Promise<void>((resolve: any, reject: any) => {
      let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      chunks = Math.ceil(file.size / chunkSize)
      currentChunk = 0
      spark = new SparkMD5.ArrayBuffer()
      fileReader = new FileReader()
    })
  }
}
