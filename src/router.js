// default
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//pages
import Home from '@/pages/Home'

// routes
export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }
    ]
})
