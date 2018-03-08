import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MissionList from '@/components/MissionList'
import MissionItem from '@/components/MissionItem'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: MissionList
        },
        {
            path: '/mission_list',
            component: MissionList
        },
        {
            path: '/mission_item',
            name: 'mission_item',
            component: MissionItem,
            props: true
        }
    ]
})