const { ref, h } = window.Vue

export default {
  name: 'RoyToast',
  props: {
    message: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 3000
    },
    removeSelf: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {
      visible: true,
      copiedDuration: 0,
      verticalOffset: 0,
      timer: null,
      pauseTimer: null,
      isPaused: false,
      tikDownInterval: null
    }
  },
  computed: {
    icon() {
      switch (this.status) {
        case 'info':
          return 'ri-information-line'
        case 'success':
          return 'ri-checkbox-circle-line'
        case 'warning':
          return 'ri-error-warning-line'
        case 'error':
          return 'ri-close-circle-line'
        default:
          return ''
      }
    },
    positionStyle() {
      return {
        'top': `${this.verticalOffset}px`,
        '--duration': `${Math.floor(this.duration / 1000)}s`
      }
    }
  },
  methods: {
    close() {
      this.visible = false
      this.removeSelf()
    },
    clearTimer() {
      if (this.timer !== null) {
        clearTimeout(this.timer)
      }
      if (this.pauseTimer !== null) {
        clearTimeout(this.pauseTimer)
      }
      if (this.tikDownInterval !== null) {
        clearInterval(this.tikDownInterval)
      }
    },
    doPause() {
      this.pauseTimer = setTimeout(_ => {
        this.doRestart(true)
      }, 2000)
    },
    doContinue() {
      if (this.timer !== null) {
        clearTimeout(this.pauseTimer)
      }
      this.doRestart(false)
      this.pauseTimer = null
    },
    doRestart(isIn) {
      if (isIn) {
        this.clearTimer()
        this.isPaused = true
      } else {
        if (this.isPaused) {
          this.startTimer()
          this.isPaused = false
        }
      }
    },
    startTimer() {
      if (this.copiedDuration === 0) {
        this.copiedDuration = this.duration
      }
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.close()
        }, this.copiedDuration)
        this.tikDownInterval = setInterval(_ => {
          if (this.copiedDuration > 1000) {
            this.copiedDuration -= 1000
          }
        }, 1000)
      }
    }
  },
  render() {
    if (this.visible) {
      return h('div', {
        class: `roy-toast roy-toast--center roy-toast__status--${this.status} ${this.isPaused ? 'roy-toast--hover-tab' : ''}`,
        style: {
          width: 'auto',
          opacity: '1',
          ...this.positionStyle
        },
        onmouseenter: this.doPause,
        onmouseleave: this.doContinue
      }, [
        h('div', ''),
        h('div',
          {
            class: 'roy-toast__main'
          },
          [
            h('i', {
              class: this.icon
            }, ''),
            h('span', {
              class: 'roy-toast__message'
            }, this.message)
          ]),
        h('i', {
          class: 'roy-toast__close ri-close-fill',
          onclick: this.close
        }, '')
      ])
    } else {
      return h('span', {
        style: {
          display: 'none'
        }
      })
    }
  },
  mounted() {
    this.startTimer()
  },
  beforeDestroy() {
    this.clearTimer()
    this.timer = null
    this.pauseTimer = null
  }
}