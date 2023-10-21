export const CONFIG_KEY = 'app-config'
// 默认配置
const defaultConfig = {
  theme: 'light',
  locale: 'zh'
}

export function getConfig() {
  return JSON.parse(localStorage.getItem(CONFIG_KEY) || JSON.stringify(defaultConfig))
}
export function setConfig(conf: any) {
  const config = JSON.parse(localStorage.getItem(CONFIG_KEY) || JSON.stringify(defaultConfig))

  Object.keys(conf).forEach((key) => {
    config[key] = conf[key]
  })

  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}

// // 常量
// export const ImageVariables = {
//   width: 'w',
//   height: 'h',
//   aspectRatio: 'ar',
//   rotate: 'a',
//   opacity: 'o'
// } as const

// type ImageVariablesType = typeof ImageVariables
// type ImageFields2 = keyof typeof ImageVariables

// type ImageFields3 = typeof ImageVariables[ImageFields2]

// // interface
// interface Base {
//   width: string
//   height: string
//   sum: number
// }

// const ba01:Base = {
//   width: "12",
//   height: "sdas",
//   sum: 12
// }

// const ba02 = <Base> {
//   width: '12',
//   height: 'sdas',
//   sum: 12
// }

// // 枚举
// enum EImageVariables {
//   width = 'w',
//   height = 'h',
//   aspectRatio = 'ar',
//   rotate = 'a',
//   opacity = 'o',
// }

// type EImageVariablesType = typeof EImageVariables;
// type EImageFields = keyof EImageVariablesType;
