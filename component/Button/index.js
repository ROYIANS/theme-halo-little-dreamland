const { ref, h } = window.Vue

export default {
  name: 'RoyButton',
  props: {
    iconClass: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h(ElementPlus.ElButton,
      {
        class: 'roy-button'
      },
      () => [
        h('i', { class: props.iconClass }),
        h('div', slots.default())
      ])
  }
}