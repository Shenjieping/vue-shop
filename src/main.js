// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import './assets/css/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from 'axios'

Vue.prototype.http = http
Vue.use(ElementUI)
Vue.config.productionTip = false
function getCookie(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1)
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
}
router.beforeEach((to, from, next) => {
    if (to.name === 'Login' || to.name === 'MobileHome') {
        next()
    } else {
        if (!getCookie('userName')) {
            next({ path: '/login' })
        } else {
            next()
        }
    }
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
