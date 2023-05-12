import Vue from 'vue'
import Router from 'vue-router'
const Layout = resolve => require(['@/components/layouts/Layout'], resolve);
const mainPage = resolve => require(['@/components/pages/mainPage'], resolve);
const bnbNeat = resolve => require(['@/components/pages/bnbNeat'], resolve);
const neatBnb = resolve => require(['@/components/pages/neatBnb'], resolve);
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Layout,
        children: [{
            path: '',
            name: 'mainPage',
            component: mainPage, 
            meta: []
        },
        {
            path: '/neatBnb',
            name: 'neatBnb',
            component: neatBnb,
        },
        {
            path: '/bnbNeat',
            name: 'bnbNeat',
            component: bnbNeat,
        },
        ]
    }]
})

export default router
