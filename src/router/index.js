import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Notification from '@/components/Notification'
import Mission from '@/components/Mission'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Hello',
            component: Hello
        }
        // {
        //   path: '/notification',
        //   name: 'Notification',
        //   component: Notification
        // },
        // {
        //   path: '/mission',
        //   name: 'Mission',
        //   component: Mission
        // },
    ]
})