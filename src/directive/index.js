
import dragDiv from './dragDiv'
import dragDialog from './dragDialog'

const install = function(Vue) {
  Vue.directive('dragDiv', dragDiv)
  Vue.directive('dragDialog', dragDialog)

}

if (window.Vue) {
  Vue.use(install); // eslint-disable-line
}

export default install
