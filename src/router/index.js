import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MissionList from '@/components/MissionList'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/mission',
            name: 'Mission List',
            component: MissionList
        }
    ]
})