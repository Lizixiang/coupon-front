import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/search/index'
import searchList from '@/components/search/list'

/**
 * 重写路由的push方法--->这个是vue-cli4.x以上的坑，不然的话，你是跳转不了的
 */
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return routerPush.call(this, location).catch(error => error)
// }

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '',
            component: index
        },
        {
            path: '/search/list',
            component: searchList
        }
    ],
    mode: 'history',
    linkActiveClass: 'active'
});


// 导航守卫  注册前置守卫用于判断用户是否登录
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') {
//         next();
//     } else {
//         let token = localStorage.getItem("Authorization");
//         if (token === null || token === undefined || token === 'null' || token === '') {
//             next('/login');
//         } else {
//             next();
//         }
//     }
// });

export default router;
