
import dragDiv from './dragDiv'
import dragDialog from './dragDialog'
import imageLazy from './imageLazy'
import backgroundLazy from './backgroundLazy'

const install = function(Vue) {
  Vue.directive('dragDiv', dragDiv)
  Vue.directive('dragDialog', dragDialog)
  Vue.directive('img-lazy-src', imageLazy);
  Vue.directive('img-lazy-bg', backgroundLazy);

}

if (window.Vue) {
  Vue.use(install); // eslint-disable-line
}

export default install
