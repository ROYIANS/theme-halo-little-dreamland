import toast from './toast.js'
const { createVNode, render } = window.Vue

let mountNode = null

function Toast(options = {}) {
  if (mountNode) {
    document.body.removeChild(mountNode);
    mountNode = null;
  }
  const app = createVNode(toast, {
    ...options,
    removeSelf: () => {
      document.body.removeChild(mountNode);
      mountNode = null;
    }
  });
  mountNode = document.createElement("div");
  render(app, mountNode);
  document.body.appendChild(mountNode);
}

export default Toast
