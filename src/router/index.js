import Vue from 'vue'
import Router from 'vue-router'
const Layout = resolve => require(['@/components/layouts/Layout'], resolve);
const mainPage = resolve => require(['@/components/pages/mainPage'], resolve);

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
        ]
    }]
})

export default router
