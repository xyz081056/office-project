<template>
    <div class="messageManagement">
        <!--布局方法一、element-ui的Layout布局 即el-row和el-col布局 -->
        <!-- 布局方法二、自己用div布局，该页面所用方法-->
        <!-- 消息管理标题 -->
        <h1 style="font-size:30px">消息管理</h1>
        <hr width="90%"/>
        <!-- 在element-ui中默认居中对齐，通过修改align的值让其靠左或者靠右 -->
        <!-- 消息管理头部 -->
      <div class="header">
          <!-- 消息头上面部分 -->
          <!-- <div class="header-top">
              <p>请输入填写消息的时间：</p>
          </div> -->
          <!-- 消息头下面部分 -->
          <div class="header-bottom">
              <!-- 消息头下面部分左半边 -->
              <div class="header-left">
                  <el-form style="display:flex">
                      <el-form-item label="请输入填写消息的时间:">
                          <el-date-picker
                          @change='searchByDateRange'
                          v-model="dataRange"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          range-separator="--"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          placeholder="选择日期">
                          </el-date-picker>
                      </el-form-item>
                  </el-form>
              </div>
              <!-- 消息头下面右半部分 -->
              <div class="header-right">
                  <!-- 对于单选按钮里:labal绑定的值会传给后台 -->
                  <el-radio-group v-model="radio1">
                      <el-radio :label="2">本日</el-radio>
                      <el-radio :label="3">本周</el-radio>
                      <el-radio :label="4">本月</el-radio>
                  </el-radio-group>
                  <el-button type="primary" icon="el-icon-search" size='medium' @click="search">搜索</el-button>
              </div>
          </div>
      </div>
      <!-- 消息添加按钮 -->
          <div class="add">
              <el-link icon="el-icon-plus" @click.prevent="addDialog">添加新消息</el-link>
          </div>
      <!-- 消息管理主体 -->
      <div class="main">
          <el-table
              :data="messages"
              border>
              <el-table-column
                  label="消息标题"
                  fixed
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.title }}</span>
                      </template>
              </el-table-column>
              <el-table-column
                  label="消息类型"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.messageTypeName }}</span>
                      </template>
              </el-table-column>
              <el-table-column
                  label="消息内容"
                  align="center">
                      <template slot-scope="scope">
                          <a @click.prevent="showContent(scope.$index, scope.row)"
                           v-for="item in messages"
                           style="color:blue;
                           cursor: pointer;
                           white-space: nowrap;
                           overflow: hidden;
                           text-overflow: clip;">
                              {{ scope.row.content }}
                          </a>
                      </template>
              </el-table-column>
              <el-table-column
                  label="创建者"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.username }}</span>
                      </template>
              </el-table-column>
              <el-table-column
                  label="发送对象"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.sendUser }}</span>
                      </template>
              </el-table-column>
              <el-table-column
                  label="开始时间"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.beginTime }}</span>
                      </template>
              </el-table-column>
              <el-table-column
                  label="结束时间"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.endTime }}</span>
                      </template>
              </el-table-column>
              <el-table-column
                  label="创建时间"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.recordTime }}</span>
                      </template>
              </el-table-column>
              <el-table-column label="修改" fixed="right">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            :disabled="byPublish"
                            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        </template>
              </el-table-column>
              <el-table-column label="删除" fixed="right">
                        <template slot-scope="scope">
                           <el-button
                            size="mini"
                            type="info"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
              </el-table-column>
              <el-table-column label="发布" fixed="right">
                        <template slot-scope="scope">
                           <el-button
                            size="mini"
                            type="danger"
                            @click="handleRelease(scope.$index, scope.row)">发布</el-button>
                        </template>
              </el-table-column>
          </el-table>
      </div> 
      <!-- 添加新消息对话框 -->
      <div>
          <el-dialog :title="dialogTitle" :visible.sync="dialogAdd">
              <el-form :model="message">
                  <el-row>
                      <el-col :span="12">
                          <el-form-item label="消息标题：" >
                              <el-input v-model="message.title" placeholder="请输入标题"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="消息类型："  >
                          <!-- 凡是下拉列表里的:value绑定的值都会传给后台，:labal绑定的值会显示到框里 ,如果只写:value的话
                          框里显示的和传到后台的都是它绑定的值-->
                              <el-select v-model="message.messageTypeName" placeholder="请选择消息类型">
                                  <el-option
                                  v-for="item in types"
                                  :label="item.label"
                                  :key="item.value"
                                  :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                      </el-col>
                  </el-row> 
                  <el-row>
                      <el-col :span="12">
                          <el-form-item label="开始有效时间：" >
                              <el-date-picker
                              v-model="message.beginTime"
                              type="datetime"
                              placeholder="选择日期">
                              </el-date-picker>
                          </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="结束有效时间：" >
                              <el-date-picker
                              v-model="message.endTime"
                              type="datetime"
                              placeholder="选择日期">
                              </el-date-picker>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-form-item label="发送对象：">
                          <el-radio-group v-model="message.ifAll" :disabled="byEdit">
                              <el-radio :label="1">所有人</el-radio>
                              <el-radio :label="0" >选择特定对象</el-radio>
                          </el-radio-group>
                      </el-form-item>
                  </el-row>
                  <!-- 筛选范围 -->
                  <!-- 其中v-if控制筛选范围的隐藏 -->
                  <div class="screeningScope" v-if='message.ifAll===0'>
                      <el-row>
                          <el-form-item label="筛选范围：">
                              <el-checkbox-group v-model="checkbox" v-on:change="test()">
                                  <el-checkbox :label="6" >按机构</el-checkbox>
                                  <el-checkbox :label="7" >按部门</el-checkbox>
                                  <el-checkbox :label="8" >按员工号</el-checkbox>
                                  <el-checkbox :label="9" >按姓名</el-checkbox>
                              </el-checkbox-group>
                          </el-form-item>
                      </el-row> 
                      <el-row >
                          <el-col :span="12">
                              <el-form-item label="机构：" >
                                  <el-select v-model="message.branchName"
                                      :disabled=byBranch
                                      v-on:change="getBranch($event)"
                                      placeholder="请选择机构">
                                      <el-option
                                      v-for="item in branchNames"
                                      :key="item.value"
                                      :lable="item.branchId"
                                      :value="item.branchName">
                                      </el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                          <el-col :span="12">
                              <el-form-item label="部门："  >
                                  <el-select v-model="message.departName"
                                   v-if="message.value!=''"
                                   :disabled=byDepart
                                   v-on:change="getDepart($event)"
                                   placeholder="请选择部门">
                                      <el-option
                                      v-for="item in departNames"
                                      :key="item.value"
                                      :lable="item.departId"
                                      :value="item.departName">
                                      </el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span=12>
                              <el-form-item label="员工号：">
                                  <el-input v-model="message.userId" placeholder="请输入员工号" :disabled=byId></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span=12>
                              <el-form-item label="姓名："  >
                                    <el-autocomplete
                                    :disabled=byName
                                    class="inline-input"
                                    v-model="name"
                                    :fetch-suggestions="querySearch"
                                    placeholder="请输入姓名"
                                    :trigger-on-focus="false"
                                    @select="handleSelect"
                                  ></el-autocomplete>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-button type="primary">确认选择范围</el-button>
                  </div>
                  <el-row>
                      <el-col :span="24">
                          <el-form-item label="消息内容：" >
                              <el-input
                                  type="textarea"
                                  :rows="5"
                                  placeholder="请输入具体消息内容"
                                  v-model="message.content">
                              </el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogAdd = false">取 消</el-button>
                  <el-button type="primary" @click="addMessage()">确 定</el-button>
              </div>
          </el-dialog>
      </div>
    </div>
  </template>
  
  <script>
      // 全局配置接口前缀
      // Vue.http.options.root = 'http://localhost:8080';
       // 全局配置 emulateJSON 选项
      //  Vue.http.options.emulateJSON = true;
  export default {
      data(){//组件的数据必须是一个function方法，且必须有返回值即return
          return{
              ifadd:'',
              dataRange:'',
              beginTime:'',//开始时间
              endTime:'',//结束时间
              radio1:'',//第一组单选框
              checkbox:[],//复选框
              dialogTitle:'',//存放对话框标题
              name:'',//员工姓名的双向绑定
              restaurants: [],//用来存放后端接收到的员工姓名
              //表示姓名、机构、id、部门、发送对象的输入框通过多选和单选按钮控制可选和不可选状态
              byName: true,
              byBranch: true,
              byId: true,
              byDepart: true,
              byEdit : false,
              byPublish:false,
              // messages 这个数组用于存储从后台接收过来的消息
              messages:[],
              dialogAdd: false,//对话框默认关闭
              message: {//表单里的数据，用来暂时存储数据
                  messageId:'',
                  title: '',
                  messageTypeName: '',
                  content: '',
                  username: '',
                  beginTime:'',
                  sendUser:'',
                  endTime: '',
                  ifAll:1,//表单里的发送对象的单选按钮
                  },
                  // 下拉框
              types: [{//消息类型下拉框被写死
                  label: '一般消息',//列表里会显示出来的值
                  value: '一般消息',//传给后台的值
              },{
                  label: '紧急消息',
                  value: '紧急消息',
              }],
              // 机构下拉框
              branchNames:[],
              // 部门下拉框
              departNames:[],
            //   filter:[]
              }
          },
          methods:{
              // 获取桌面所有信息
              getMessageInfo() {
                  this.postRequest('/myoffice/message/search',{}).then(res => {
                //   console.log('桌面数据', res)
                  this.messages = res.data.obj.messageList
                  })
              },
              // 通过时间段搜索
              searchByDateRange(val){
                  this.dataRange = val
                // 如果时间段不为空，则进行按时间段搜索，反之加载页面所有消息
                  if(this.dataRange != null){
                  this.dataRange.forEach(element => {
                     this.beginTime = this.dataRange[0]
                     this.endTime = this.dataRange[1]
                  });
                  var datas = {
                      "beginTime":this.beginTime,
                      "endTime":this.endTime,
                  }
                console.log(datas)
                      this.postRequest("/myoffice/message/search", datas).then(res=> {
                      if (res && res.status == 200) {
                      this.messages = res.data.obj.messageList;
                    //   console.log(this.messages)
                      this.$message({type: 'success', message: "查询成功！"});
                      }
                  })
                }else {
                    this.getMessageInfo()
                }
              },
              // 通过本日、本周、本月搜索
              search(){
                  console.log(this.radio1)
                  if(this.radio1===2){//本日查询
                      this.postRequest("/myoffice/message/searchByDay", {}).then(res=> {
                      if (res && res.status == 200) {
                      this.messages = res.data.obj.messageList;
                    //   console.log(this.messages)
                      this.$message({type: 'success', message: "查询成功！"});
                      }
                  })
                  }else if(this.radio1===3){
                      this.postRequest('/myoffice/message/searchByWeek',{}).then(res => {//本周搜索
                          if (res && res.status == 200) {
                      this.messages = res.data.obj.messageList;
                    //   console.log(this.messages)
                      this.$message({type: 'success', message: "查询成功！"});
                          }
                      })
                  }else{
                      this.postRequest('/myoffice/message/searchByMonth',{}).then(res => {//本月搜索
                          if (res && res.status == 200) {
                          this.messages = res.data.obj.messageList;
                        //   console.log(this.messages)
                          this.$message({type: 'success', message: "查询成功！"});
                      }
                      })
                  }
              },
              addDialog(){//用于切换对话框的标题
                  this.dialogTitle = "添加新消息"
                  this.ifadd = 1
                  this.dialogAdd = true 
                  this.byEdit = false
                  // 清空表单数据
                  this.message.messageId = 
                  this.message.title = ''
                  this.message.messageTypeName = ''
                  this.message.endTime = ''
                  this.message.beginTime = ''
                  this.message.ifAll = 1
                  this.message.content = ''
              },
              // 添加和修改功能
              addMessage(){
                  console.log(this.message)
                  console.log(this.ifadd)
                //   如果iffadd = 1 表示添加
                  if(this.ifadd === 1){
                  this.postRequest('/myoffice/message/addMessage',this.message).then(res => {
                      this.dialogAdd = false;
                      this.getMessageInfo() //刷新页面
                      }) 
                    }else{//如果不是表示修改
                    this.postRequest('/myoffice/message/updateMessage',this.message).then(res => {
                    this.dialogAdd = false;
                    this.getMessageInfo() //刷新页面
                    })
                    }
              },
              // 点击下方消息内容时弹出详细消息内容
              showContent(index,row){
                  // 由于返回的是一个数组，要想拿到数组对象身上值，必须先遍历一遍后将对象返回，但由于返回的的是数组中的
                  // 所有对象，所以不能实现点击某行出现该行的内容，所以此时就要进行函数传参，以保证返回的是该行到的内容
                  // 下面的循环可以用v-for在标签中代替
                  // this.messages.forEach(res=>{
                      this.$alert(row.content, '该消息基本内容如下', {
                      confirmButtonText: '关闭',
                      callback: action => {
                  this.$message({
                      type: 'success',
                      message: `已阅读具体消息内容！`
                          });
                      }
                  })
                  // })
              },
              // 弹出框的发送对象控制勾选状态下的可选与不可选
              test () {
                //   console.log(this.checkbox)
                  if(this.checkbox.indexOf(6) > -1){
                      this.byBranch = false
                  }else if(this.checkbox.indexOf(7) > -1 ){
                      this.byBranch = false
                      this.byDepart = false
                  }else if(this.checkbox.indexOf(8) > -1){
                      this.byId = false
                  }else if(this.checkbox.indexOf(9) > -1){
                      this.byName =  false
                  }else if(this.checkbox.indexOf(6) > -1 || this.checkbox.indexOf(8) > -1){
                      this.byBranch = false
                      this.byId = false
                  }
                  // else if(this.checkbox.indexOf(6) > -1 && this.checkbox.indexOf(7) > -1){
                  //     this.byBranch = false
                  //     this.byDepart = false
                  //     this.byId = true
                  //     this.byName =  true
                  // }
                  // if ( this.checkbox.indexOf(9) > -1 ) {
                  //     this.byName = false;
                  // } else if(this.checkbox.indexOf(6) > -1){
                  //     this.byBranch = false
                  // }else if(this.checkbox.indexOf(7) > -1 ){
                  //     this.byDepart = false
                  //     this.byBranch = false
                  // }else if(this.checkbox.indexOf(8) > -1){
                  //     this.byId = false
                  // }
                  else {
                      this.byName =  true
                      this.byBranch = true
                      this.byDepart = true
                      this.byId = true
                  }
              },
              // 修改功能
              handleEdit(index,row){
                //   console.log(row)
                  this.dialogAdd = true;
                  this.dialogTitle = "修改新消息";
                  this.byEdit = true;
                  this.ifadd = 2
                //   console.log(this.ifadd)
                  this.message.messageId = row.messageId
                  this.message.title = row.title
                  this.message.messageTypeName = row.messageTypeName
                  this.message.beginTime = row.beginTime
                  this.message.endTime = row.endTime 
                  this.message.content = row.content 
                
              },
              // 删除功能
              handleDelete(index,row) {
                //   console.log(row.messageId)
              var datas ={          
                      "messageIds":[row.messageId]
                  }
                //   console.log(datas)
                  this.deleteRequest(`/myoffice/message/deleteByMessageId/`,datas).then(res =>{
                  this.getMessageInfo()    //删除数据，更新视图
                  })
              },
              // 发布功能
              handleRelease(index,row){
                //   console.log(row)
                //   this.byPublish = true;
                  // 使用var datas 封装要传给后端的数据，且格式目前我暂知这一种
                   var datas ={
                      "messageId":row.messageId
                      } 
                //   console.log(datas)
                  this.postRequest('/myoffice/message/publishMessage',datas).then(res => {
                      if (res && res.status == 500) {
                        this.$message({
                        type:"success",
                        message:"请勿重复发布"
                        })
                      }
                 })
              },
              //   获取机构
              getBranch(){
                this.postRequest('/myoffice/message/listBranch',{}).then(res => {
                      if (res && res.status == 200) {
                        // console.log('机构',res)
                        this.branchNames = res.data.obj.branchList
                        // console.log(this.branchNames)
                      }
                 })
              },
            //   获取部门
              getDepart(){
                this.postRequest('/myoffice/message/listDepart',{}).then(res => {
                      if (res && res.status == 200) {
                        // console.log('部门',res)
                        this.departNames = res.data.obj.departList
                        // console.log(this.departNames)
                      }
                 })
              },
            //   获取员工姓名
              getName(){
                this.postRequest('/myoffice/message/listUser',{}).then(res => {
                      if (res && res.status == 200) {
                        // console.log('员工',res)
                      return res.data.obj.userList
                      }
                 })
              },
            //   在员工姓名输入框中输入对应字段后给出建议列表
              querySearch(queryString, cb) {
                    var restaurants = this.restaurants;
                    var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                    cb(results);
                },
                createFilter(queryString) {
                    return (restaurant) => {
                    return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    };
                },
                // 手动输入
                handleSelect(item) {
                    console.log(item);
                }
          },
          // 生命周期函数用于加载数据，使其在桌面展示出来
          created(){
              this.getMessageInfo() 
              this.getBranch()
              this.getDepart()
              this.getName()
          },
          mounted(){
            this.restaurants = this.getName()
            // console.log(this.restaurants)
            // this.searchByDateRange()
          }
          
      }
      
  </script>
  
  <style>
  /* 头部样式 */
  .header{
      margin-left: 5%
  }
  .el-date-editor--datetimerange.el-input, 
  .el-date-editor--datetimerange.el-input__inner{
      width: 460px;
  }
  .header-bottom{
      display: flex;
  }
  .header .header-left{
      height: 80px;
      line-height: 80px;
      margin-top: 20px;
      flex: 5
  }
  .header .header-left .el-form-item {
      margin-right: 30px
  }
  .header .header-right{
      height: 80px;
      line-height: 80px;
  
      flex: 5
  }
  .header .header-right button{
      margin-left: 20px;
  }
  .add{
      width: 95%;
      margin: 0 2.5% 0 2.5%;
      height: 50px;
      text-align: right;
      background-color:skyblue;
      margin-bottom: 20px;
  }
  .add a{
      margin-right:5%;
      line-height: 50px;
      text-decoration: none;
  }
  /* 内容样式 */
  .main{
      margin: 0 3% 0 3%;
  }
  /* 省略号显示 ,由于页面加载有先后顺序，所以把样式放到了行内标签上*/
  .el-table_1_column_3 .cell a{
      color:blue;
      cursor: pointer;
      white-space: nowrap;/*强制一行显示 */
      overflow: hidden;
      text-overflow: clip;
  }
  .el-table_1_column_5 .cell span{
      color:red
  }
  /* 弹出框样式修改 */
  .el-message-box__title{
      text-align: center;
      margin-bottom: 5px;
  }
  .el-input--suffix .el-input__inner{
      padding-right: 0px
  }
  .el-form-item__content{
      display: flex;/*强制性让对话框的标签和输入框显示到一行 */
  }
  .el-dialog .el-input{
      width: 80%
  }
  .el-radio-button__inner, .el-radio-group{
      line-height: 50px;
      height: 40px;
  }
   .screeningScope{/*默认所有人，选择特定对象被隐藏 */
      /* display: none; */
      height: 240px;
      background:rgba(200, 200, 200,0.1 );
      margin-bottom: 20px;
      border:1px solid black;
      border-radius: 10px
  } 
  .el-textarea__inner{
      width: 100%
  }
  </style>