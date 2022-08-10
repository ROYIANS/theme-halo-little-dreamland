import Toast from '../component/Toast/index.js'

export default {
  data() {
    return {
      showToastMessage: Toast
    }
  },
  computed: {
  },
  methods: {
    isPlainObject(obj) {
      return typeof obj === 'object' && obj !== null && Object.prototype.toString.call(obj) === '[object Object]'
    },
    /**
     * 通过name查找父组件
     * @param {*} vueIns
     * @param {*} name
     */
    findParentComponent(vueIns, name) {
      let parent = vueIns.$parent
      while (parent) {
        let componentName = parent.$options.componentName || parent.$options.name
        if (componentName !== name) {
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return false
    },
    /**
     * 判断是否为基础类型object（这为基础类型判断，所以数组和对象是区分不开的，只为下边对比使用）
     * @param {any} obj 传入要判断的数据类型
     * @returns 为object的为 true， 否则为false
     */
    isObject(obj) {
      return obj !== null && typeof obj === 'object'
    },

    /**
     * 判断两个值是否相等
     * @param {any} a 任意数据类型
     * @param {any} b 任意数据类型
     * @returns true 为一致， false 为不相等
     */
    looseEqual(a, b) {
      if (a === b) { return true }
      const isObjectA = this.isObject(a)
      const isObjectB = this.isObject(b)
      if (isObjectA && isObjectB) {
        try {
          const isArrayA = Array.isArray(a)
          const isArrayB = Array.isArray(b)
          if (isArrayA && isArrayB) {
            return a.length === b.length && a.every((e, i) => {
              return this.looseEqual(e, b[i])
            })
          } else if (a instanceof Date && b instanceof Date) {
            return a.getTime() === b.getTime()
          } else if (!isArrayA && !isArrayB) {
            const keysA = Object.keys(a)
            const keysB = Object.keys(b)
            return keysA.length === keysB.length && keysA.every((key) => {
              return this.looseEqual(a[key], b[key])
            })
          } else {
            /* istanbul ignore next */
            return false
          }
        } catch (e) {
          /* istanbul ignore next */
          console.error(e)
          return false
        }
      } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b)
      } else {
        return false
      }
    },

    /**
     * 获取在集合中，当前值的位置
     * @param {any} arr 传入的集合
     * @param {any} val 要查询是否在集合中位置的值
     * @returns -1 为不存在，0或0以上为存在的位置下标
     */
    looseIndexOf(arr, val) {
      for (let i = 0; i < arr.length; i++) {
        if (this.looseEqual(arr[i], val)) { return i }
      }
      return -1
    },
    /**
     * @description:下划线转为驼峰命名
     * @params 驼峰格式名字
     */
    toHump(name) {
      return name.replace(/_(\w)/g, function (all, letter) {
        return letter.toUpperCase()
      })
    },
    /**
     * @description:驼峰命名转为下划线
     * @params 驼峰格式名字
     */
    toLine(name) {
      return name.replace(/([A-Z])/g, '_$1').toLowerCase()
    },
    isBlank(value) {
      return (value === undefined || value === null || value === '')
    },
    deepCopy(obj, cache = []) {
      if (obj === null || typeof obj !== 'object') {
        return obj
      }
      const objType = Object.prototype.toString.call(obj).slice(8, -1)
      // 考虑 正则对象的copy
      if (objType === 'RegExp') {
        return new RegExp(obj)
      }
      // 考虑 Date 实例 copy
      if (objType === 'Date') {
        return new Date(obj)
      }
      // 考虑 Error 实例 copy
      if (objType === 'Error') {
        return new Error(obj)
      }
      const hit = cache.filter((c) => c.original === obj)[0]
      if (hit) {
        return hit.copy
      }
      const copy = Array.isArray(obj) ? [] : {}
      cache.push({ original: obj, copy })
      Object.keys(obj).forEach((key) => {
        copy[key] = this.deepCopy(obj[key], cache)
      })
      return copy
    },
    getUuid(hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') { // 获取mapid
      let s = []
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4'
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
      s[8] = s[13] = s[18] = s[23] = ''
      let uuid = s.join('')
      return uuid
    },
    dataURLtoBlob(base64Str, type = 'application/vnd.ms-excel') {
      let bstr = atob(base64Str)
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: type })
    }
  },
  created() {
  }
}
