import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'

import './style/elementui.scss'
import './style/index.css'
import './style/index.scss'
// import 'element-ui/lib/theme-chalk/index.css'
import './permission'

// 全局方法挂载 
import { setFontSize } from "@/utils/usuallyMethods";
Vue.prototype.setFontSize = setFontSize
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(Element)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
