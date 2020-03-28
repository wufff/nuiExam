import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'
import ft from './util/format.js'
Vue.prototype.$http = myRequest;
Vue.prototype.$ft= ft;

Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
