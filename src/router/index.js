import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MissionList from '@/components/MissionList'
import MissionItem from '@/components/MissionItem'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
    routes: [{
            path: '*',
            name: 'redirect',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/mission',
            name: 'MissionList',
            component: MissionList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/mission/:id',
            name: 'MissionItem',
            component: MissionItem,
            props: true,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('mission');
    else next();
})

export default router