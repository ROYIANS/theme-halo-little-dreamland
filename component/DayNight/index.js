import commonMixin from "../../mixin/commonMixin.js"
const { ref, h } = window.Vue

export default {
  name: 'RoyDayNight',
  mixins: [commonMixin],
  props: {
  },
  data() {
    return {
      isNightMode: null
    }
  },
  render() {
    return h('div', {
      class: 'roy-day-night-switcher'
    }, [
      h('input', {
        type: 'checkbox',
        checked: this.isNightMode,
        onClick: () => {
          this.isNightMode = !this.isNightMode
        }
      }, ''),
      h('span', '')
    ])
  },
  watch: {
    isNightMode(newVal) {
      if (newVal) {
        document.querySelector('html').classList.add('dark')
        this.showToastMessage({ status: 'success', message: '切换夜间主题成功' })
      } else {
        document.querySelector('html').classList.remove('dark')
        this.showToastMessage({ status: 'success', message: '切换日间主题成功' })
      }
      localStorage.setItem('__roy__isNightMode__', newVal)
    }
  },
  mounted() {
    const isNightMode = localStorage.getItem('__roy__isNightMode__')
    if (isNightMode !== null) {
      this.isNightMode = JSON.parse(isNightMode)
    } else {
      this.isNightMode = false
    }
  }
}