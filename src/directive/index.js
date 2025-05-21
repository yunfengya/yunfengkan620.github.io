
import dragDiv from './dragDiv'

const install = function(Vue) {
  Vue.directive('dragDiv', dragDiv)

}

if (window.Vue) {
  Vue.use(install); // eslint-disable-line
}

export default install
