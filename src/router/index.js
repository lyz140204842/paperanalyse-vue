import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/login/Login'

import AdminMain from "@/mainpage/adminpage/AdminMain"

import TeacherMain from "@/mainpage/teacherpage/TeacherMain"

import TeacherManage from "@/mainpage/adminpage/PeopleManage/TeacherManage";
import StudentBrowse from "@/mainpage/adminpage/PeopleManage/StudentBrowse";
import ClassesBrowse from "@/mainpage/adminpage/PeopleManage/ClassesBrowse";

import TeachingCourseBrowse from "@/mainpage/adminpage/CourseManage/TeachingCourseBrowse";
import SelectingCourseBrowse from "@/mainpage/adminpage/CourseManage/SelectingCourseBrowse";

import TermBrowse from "@/mainpage/adminpage/TermManage/TermBrowse";
import CourseBrowse from "@/mainpage/adminpage/TermManage/CourseBrowse";
import PaperBrowse from "@/mainpage/teacherpage/PaperManage/PaperBrowse";
import PaperAnalyseResult from "@/mainpage/teacherpage/PaperManage/PaperAnalyseResult";
import PictureTest from "@/mainpage/teacherpage/PaperManage/PictureTest";
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
          path: '/TeacherManage',
          name: 'TeacherManage',
          component: TeacherManage
        },
        {
          path: '/StudentBrowse',
          name: 'StudentBrowse',
          component: StudentBrowse
        },
        {
          path: '/ClassesBrowse',
          name: 'ClassesBrowse',
          component: ClassesBrowse
        },
        {
          path: '/TeachingCourseBrowse',
          name: 'TeachingCourseBrowse',
          component: TeachingCourseBrowse
        },
        {
          path: '/SelectingCourseBrowse',
          name: 'SelectingCourseBrowse',
          component: SelectingCourseBrowse
        },
        {
          path: '/TermBrowse',
          name: 'TermBrowse',
          component: TermBrowse
        },
        {
          path: '/CourseBrowse',
          name: 'CourseBrowse',
          component: CourseBrowse
        },
      ]
    },
    {
      path: '/TeacherMain', //
      name: 'TeacherMain',
      component: TeacherMain,
      children: [
        {
          path: '/PaperBrowse',
          name: 'PaperBrowse',
          component: PaperBrowse
        },
        {
          path: '/PaperAnalyseResult',
          name: 'PaperAnalyseResult',
          component: PaperAnalyseResult
        },        {
          path: '/PictureTest',
          name: 'PictureTest',
          component: PictureTest
        },

      ]
    }
  ]
})
