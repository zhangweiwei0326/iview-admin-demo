import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Locking from '../components/main-components/lockscreen/components/locking-page.vue'

// 用户管理
import User from '../components/User/User.vue'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: Login
}

export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {path: 'home', title: '首页', name: 'home_index', component: Home}
  ]
}

export const locking = {
  path: '/locking',
  name: 'locking',
  component: Locking
}

export const appRouter = [
  {
    path: '/user',
    icon: 'person-stalker',
    name: 'user',
    title: '用户管理',
    component: Main,
    children: [
      {path: 'index', title: '用户管理', name: 'user_index', component: User}
    ]
  }
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter,
  locking,
  ...appRouter
]
