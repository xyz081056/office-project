<template>
    <div class="home">
       <el-container class="home-container">
         <el-aside width="250px" class="home-aside" >
           <div class="nav">
             <p>欢迎:<strong>{{user.cname}}</strong> </p>
             <p>角色:{{user.roleName}}</p>
             <p>部门:{{user.roleDepart}}</p>
             <p style="margin-left:15px">您共有{{user.newMessages}}条新消息</p>
           </div>
           <hr>
           <!-- 写死的菜单栏 -->
           <div>
            <el-menu router
              default-active="2"
              background-color="skyblue">
              <!-- 人事管理 -->
              <el-menu-item-group>
                  <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>人事管理 </span>
                    </template>
                      <el-menu-item index="/home/branch">
                        <i class="el-icon-notebook-2"></i>
                        <span>机构管理</span>
                      </el-menu-item>
                      <el-menu-item index="/home/department">
                        <i class="el-icon-notebook-2"></i>
                        <span>部门管理</span>
                      </el-menu-item>
                      <el-menu-item index="/home/employee">
                        <i class="el-icon-notebook-2"></i>
                        <span>员工管理</span>
                      </el-menu-item>
                      </el-submenu>
              </el-menu-item-group>
              <!-- 日程管理 -->
              <el-menu-item-group>
                  <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-date"></i>
                        <span>日程管理</span>
                    </template>
                      <el-menu-item index="">
                        <i class="el-icon-notebook-2"></i>
                        <span>我的日程</span>
                      </el-menu-item>
                      <el-menu-item index="">
                        <i class="el-icon-notebook-2"></i>
                        <span>部门日程</span>
                      </el-menu-item>
                      <el-menu-item index="">
                        <i class="el-icon-notebook-2"></i>
                        <span>我的便签</span>
                      </el-menu-item>
                      </el-submenu>
              </el-menu-item-group>
              <!-- 文档管理 -->
              <el-menu-item-group>
                  <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span>文档管理</span>
                    </template>
                      <el-menu-item index="">
                        <i class="el-icon-notebook-2"></i>
                        <span>文档管理</span>
                      </el-menu-item>
                      <el-menu-item index="">
                        <i class="el-icon-notebook-2"></i>
                        <span>回收站</span>
                      </el-menu-item>
                      <el-menu-item index="">
                        <i class="el-icon-notebook-2"></i>
                        <span>文件搜索</span>
                      </el-menu-item>
                      </el-submenu>
              </el-menu-item-group>
              <!-- 消息传递 -->
              <el-menu-item-group>
                <el-submenu index="4">
                  <template slot="title">
                      <i class="el-icon-message"></i>
                      <span>消息传递</span>
                  </template>
                    <el-menu-item index="/home/message">
                      <i class="el-icon-notebook-2"></i>
                      <span>消息管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/box">
                      <i class="el-icon-notebook-2"></i>
                      <span>信箱</span>
                    </el-menu-item>
                    </el-submenu>
              </el-menu-item-group>
              <!-- 系统管理 -->
              <el-menu-item-group>
                    <el-submenu index="5">
                      <template slot="title">
                          <i class="el-icon-setting"></i>
                          <span>系统管理</span>
                      </template>
                        <el-menu-item index="">
                          <i class="el-icon-notebook-2"></i>
                          <span>角色管理</span>
                        </el-menu-item>
                        <el-menu-item index="">
                          <i class="el-icon-notebook-2"></i>
                          <span>登录日志</span>
                        </el-menu-item>
                        <el-menu-item index="">
                          <i class="el-icon-notebook-2"></i>
                          <span>菜单排序</span>
                        </el-menu-item>
                        <el-menu-item index="">
                          <i class="el-icon-notebook-2"></i>
                          <span>操作日志</span>
                        </el-menu-item>
                        </el-submenu>
              </el-menu-item-group>
              <!-- 考勤管理 -->
              <el-menu-item-group>
                    <el-submenu index="6" close>
                      <template slot="title">
                          <i class="el-icon-pie-chart"></i>
                          <span>考勤管理</span>
                      </template>
                      <el-menu-item index="">
                          <i class="el-icon-notebook-2"></i>
                          <span>员工签到、签退</span>
                        </el-menu-item>
                        <el-menu-item index="">
                          <i class="el-icon-notebook-2"></i>
                          <span>考勤统计</span>
                        </el-menu-item>
                        <el-menu-item index="">
                          <i class="el-icon-notebook-2"></i>
                          <span>考勤历史记录查询</span>
                        </el-menu-item>
                    </el-submenu>
              </el-menu-item-group>
            </el-menu>
            <!-- 插值表达式循环左侧菜单 -->
             <!-- <el-menu unique-opened router>
             <template v-for="(item,index) in this.$routes">
               <el-submenu :key="index" :index="index+''">
                 <template slot="title">
                     <i class="el-icon-notebook-2"></i>
                     <span>{{item.name}}</span>
                 </template>
                 <el-menu-item v-for="child in item.children" :index="child.nodeURL" :key="child.nodeURL">
                   <i class="el-icon-notebook-1"></i>
                   <span>{{child.displayName}}</span>
                 </el-menu-item>
               </el-submenu>
             </template>
           </el-menu> -->
         </div>
     </el-aside>
     <el-container>
         <el-header class="home-header" height="40px" width="100%">
           <i class="el-icon-document">主页</i>
           <i class="el-icon-user-solid">重新登录</i>
           <i class="el-icon-edit">修改密码</i>
           <i class="el-icon-news">显示/隐藏通知栏</i>
           <i class="el-icon-help">帮助</i>
           <i class="el-icon-smile">🙂</i>
           <i class="el-icon-date" align="right"> 今天是: {{today}}</i>
         </el-header>
         <el-main>
               <el-breadcrumb separator-class="el-icon-arrow-right">
                 <el-breadcrumb-item :to="{ path: '/Home' }">当前位置</el-breadcrumb-item>
                 <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
               </el-breadcrumb>
               <!-- <keep-alive>
                 <router-view v-if="this.$route.meta.keepAlive"></router-view>
               </keep-alive> -->
               <!-- 下面这个router-view是切换的模块区域，且给加了动画 -->
               <transition mode="out-in">
                  <router-view v-if="!this.$route.meta.keepAlive"></router-view>
               </transition>
             </el-main>
     </el-container>
       </el-container>
     </div>
   </template>

<script>
export default {
  data(){
    return{
      user:'',
    }
  },
   computed: {
      today() {
        var date = new Date()
        var seperator1 = '-'
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        var week = date.getDay() 
        if (month >= 1 && month <= 9) {
            month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
        }
        var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        var currentdate = year + seperator1 + month + seperator1 + strDate + '  ' + weekday[week]
        return currentdate 
    },
   },
}
</script>

<style>
.home-container {
    height: 98%;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 98%;
  }
  .home-aside {
    background-color: rgb(124, 204, 253);
  }
  .nav p{
    margin-left:30px;
    text-align:left;
  }
  .home-header {
    background-color:rgb(4, 142, 230);
    color:whitesmoke;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
    position: relative;
    left: 5px;
  }
  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;
  }
  .el-submenu .el-menu-item {
    width: 200px;
    min-width: 195px;
    background-color:  skyblue;
  }
  .el-submenu{
    padding-right: 100px;
    background-color:  skyblue;
  }
  .el-submenu :hover{
    background-color: skyblue;
  }
  /* 给路由切换加动画 */
  .v-enter,.v-leave-to{
           opacity: 0;
           transform: translateX(100px);
       } 
  .v-enter-active,.v-leave-active{
           transition: all 0.6s ease-in;
       }
</style>