
import dialogDrag from './drag'

const install = function(Vue) {
  Vue.directive('dialogDrag', dialogDrag)

}

if (window.Vue) {
  Vue.use(install); // eslint-disable-line
}

export default install
