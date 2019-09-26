import Vue from 'vue'
import Router from 'vue-router'
import messageManagement from '@/components/message/messageManagement'
import Department from '@/components/PersonManagement/Department'
import Branch from '@/components/PersonManagement/Branch'
import Employee from '@/components/PersonManagement/Employee'
import messageBox from '@/components/message/messageBox'
import home from '@/components/home'

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
          // hidden: true
        },
        {
          path: '/home/branch',
          name: '机构管理',
          component: Branch,
          // hidden: true
        },
        {
          path: '/home/employee',
          name: '员工管理',
          component: Employee,
          // hidden: true
        },

      ]
    },
  ]
})
