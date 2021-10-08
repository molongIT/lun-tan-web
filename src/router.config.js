import Blog from './views/Blog.vue'
import login from './views/login/login.vue'
import Index from './views/layout/Index.vue'
import say from './views/say/say.vue'
import writePage from './components/writePage.vue'

export default {
    routes: [{
            path: '/Blog',
            component: Blog
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/Index',
            component: Index
        },
        {
            path: '/say',
            component: say
        },
        {
            path: '/writePage',
            component: writePage
        },
        {
            path: '/',
            redirect: '/Index'
        },
    ]
}