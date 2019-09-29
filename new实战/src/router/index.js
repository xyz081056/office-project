import Vue from 'vue'
import Router from 'vue-router'
import messageManagement from '@/components/message/messageManagement'
import Department from '@/components/PersonManagement/Department'
import Branch from '@/components/PersonManagement/Branch'
import Employee from '@/components/PersonManagement/Employee'
import messageBox from '@/components/message/messageBox'
import home from '@/components/home'
import SignInAndSignOut from '@/components/AttendanceManagement/SignInAndSignOut'
import AttendanceStatistic from '@/components/AttendanceManagement/AttendanceStatistic'
import historicalQuery from '@/components/AttendanceManagement/historicalQuery'
import test from '@/components/others/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: home,
      children: [
        {
          path: '/home/message',
          name: '消息管理',
          component: messageManagement
        },
        {
          path: '/home/box',
          name: '信箱',
          component: messageBox
        },
        {
          path: '/home/department',
          name: '部门管理',
          component: Department,
        },
        {
          path: '/home/branch',
          name: '机构管理',
          component: Branch,
        },
        {
          path: '/home/employee',
          name: '员工管理',
          component: Employee,
        },
        {
          path: '/home/SignInAndSignOut',
          name: '员工签到、签退',
          component: SignInAndSignOut,
        },
        {
          path: '/home/attendanceStatistic',
          name: '考勤统计',
          component: AttendanceStatistic,
        },
        {
          path: '/home/historicalQuery',
          name: '员工考勤历史查询',
          component: historicalQuery,
        },
        {
          path: '/home/test',
          name: '测试',
          component: test,
        },
      ]
    },
  ]
})
