import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import List from '@/views/list'
import Detail from '@/views/detail'
import Record from '@/views/record'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '*',
            redirect: 'list'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/list',
            name: 'List',
            component: List
        },
        {
            path: '/detail',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/record',
            name: 'Record',
            component: Record
        }
    ]
})
