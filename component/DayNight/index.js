const { ref, h } = window.Vue

export default {
  name: 'RoyDayNight',
  props: {
  },
  setup(props, { slots }) {
    return () => h('div',
      {
        class: 'roy-day-night-switcher'
      },
      () => [
        h('input', {
          props: {
            type: 'checkbox'
          },
          on: {
            click: () => { alert(123456) }
          }
        }),
        h('span', '12354')
      ])
  }
}