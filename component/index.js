// 功能性组件注册
import RoyButton from './Button/index.js'
import RoyDayNight from './DayNight/index.js'

const componentsLib = {
  RoyButton,
  RoyDayNight
}

const install = function (app) {
  Object.keys(componentsLib).forEach(key => {
    app.component(key, componentsLib[key])
  })
}
const Api = {
  version: 'RoyComp@0.0.1',
  author: 'ROYIANS',
  install,
  componentsLib: componentsLib
}
// auto install
if (typeof window !== 'undefined' && window.VUE_APP) {
  install(window.VUE_APP)
}
export default Api
