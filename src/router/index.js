import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/login/Login'
import AdminMain from "@/mainpage/adminpage/AdminMain"
import TeacherMain from "@/mainpage/teacherpage/TeacherMain"
Vue.use(Router)

export default new Router({
  mode:'history', // 去掉url的#号
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/AdminMain',
      name: 'AdminMain',
      component: AdminMain,
    },
    {
      path: '/TeacherMain',
      name: 'TeacherMain',
      component: TeacherMain,
    }
  ]
})
