import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/login/Login'

import AdminMain from "@/mainpage/adminpage/AdminMain"

import TeacherMain from "@/mainpage/teacherpage/TeacherMain"
import TeacherBrowse from "@/mainpage/adminpage/PeopleManage/TeacherBrowse";

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
      component: AdminMain, // 管理员界面
      children : [
        {
          path: '/TeacherBrowse',
          name: 'TeacherBrowse',
          component: TeacherBrowse
        },
      ]
    },
    {
      path: '/TeacherMain', //
      name: 'TeacherMain',
      component: TeacherMain
    }
  ]
})
