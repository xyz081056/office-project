<template>
  <div class="messageBox">
    <h1 style="font-size:30px">信箱</h1>
    <hr width="85%">
      <el-main>
          <!-- 信箱进入展示图 -->
        <el-form style="width:80%;margin:0 auto">
          <fieldset>
            <legend align="left">个人消息管理区</legend>
            <!-- 左侧区域，用来放图片 -->
           
                <div class="image" style="float: left;width:30%" >
                    <el-image
                    style="width: 100%"
                    :src="url"
                    :fit="fit"> 
                    </el-image>
                </div>
                <!-- 左侧表格 -->
                <div class="right">
                    <el-table :data="mailBox" border style="float: left;width:70%">
                        <el-table-column prop="file" label="本地文件夹" align="center">
                            <template slot-scope="scope">
                                <i class="el-icon-message" @click="showDetail(scope.row)" style="cursor:pointer">{{scope.row.file}}</i>
                            </template>
                        </el-table-column>
                        <el-table-column prop="fileNum" label="文件个数" align="center"></el-table-column>
                        <el-table-column prop="noReadFile" label="未读邮件" align="center"></el-table-column>
                    </el-table>
                </div>
            
          </fieldset>
        </el-form>
        <!-- 收件箱的弹出框 -->
        <el-dialog title="收件箱" :visible.sync="dialogInboxVisible">
            <el-table :data="inboxInfo" border @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="发件人" width="150px" align="center">
                    <template slot-scope="scope">
                        <span @click="showMessageDetail(scope.row)" style="cursor:pointer">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="主题" width="250px" align="center">
                    <template slot-scope="scope">
                        <span @click="showMessageDetail(scope.row)" style="cursor:pointer">{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="recordTime" label="发送时间" width="200px" align="center">
                    <template slot-scope="scope">
                        <span @click="showMessageDetail(scope.row)" style="cursor:pointer">{{scope.row.recordTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="messageTypeName" label="紧急程度" align="center">
                    <template slot-scope="scope">
                        <span @click="showMessageDetail(scope.row)" style="cursor:pointer">{{scope.row.messageTypeName}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer" align="right">
                <el-button type="danger" @click="deleteInboxMessage()">删除选定项</el-button>
                <el-button @click="dialogInboxVisible = false">返 回</el-button>
            </div>
            <!-- 收件箱点击列出的表格后详细信息弹出框 -->
            <el-dialog  :visible.sync="dialogMessageDetail" append-to-body>
              <fieldset>
                <legend align="center">消息详情</legend>
              <el-form :model="messageDetail">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="消息主题：">
                      <span>{{messageDetail.title}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="重要程度：">
                      <span>{{messageDetail.messageTypeName}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="消息内容：" style="display: flex;">
                        <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入具体消息内容"
                        v-model="messageDetail.content"
                        disabled>
                    </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="发件人：">
                      <span>{{messageDetail.name}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="发送时间：">
                      <span>{{messageDetail.recordTime }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              </fieldset>
              <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="updata">关 闭</el-button>
              </div>
        </el-dialog>
        </el-dialog>
        <!-- 已发送的弹出框 -->
        <el-dialog title="已发送" :visible.sync="dialogSendedVisible">
          <el-table :data="sendedInfo" border @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="name" label="收件人" width="150px" align="center">
                <template slot-scope="scope">
                    <span @click="showSendedMessageDetail(scope.row)" style="cursor:pointer">{{scope.row.username}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="主题" width="250px" align="center">
                <template slot-scope="scope">
                    <span @click="showSendedMessageDetail(scope.row)" style="cursor:pointer">{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="recordTime" label="发送时间" width="200px" align="center">
                <template slot-scope="scope">
                    <span @click="showSendedMessageDetail(scope.row)" style="cursor:pointer">{{scope.row.recordTime  }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="messageTypeName" label="紧急程度" align="center">
                <template slot-scope="scope">
                    <span @click="showSendedMessageDetail(scope.row)" style="cursor:pointer">{{scope.row.messageTypeName}}</span>
                </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer" align="right">
            <el-button type="danger" @click="deleteSendedMessage()">删除选定项</el-button>
            <el-button @click="dialogSendedVisible = false">返 回</el-button>
          </div>
          <!-- 点击已发送出现消息详情弹出框 -->
          <el-dialog :visible.sync="dialogSendedMessageDetail" append-to-body>
              <fieldset>
                  <legend align="center">消息详情</legend>
              <el-form :model="messageDetail">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="消息主题">
                      <span>{{messageDetail.title}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="紧急程度">
                      <span>{{messageDetail.messageTypeName}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="消息内容：" style="display: flex;">
                          <el-input
                          type="textarea"
                          :rows="5"
                          v-model="messageDetail.content"
                          disabled>
                      </el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="发件人">
                      <span>{{messageDetail.name}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="发送时间">
                      <span>{{messageDetail.recordTime }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              </fieldset>
              <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="dialogSendedMessageDetail = false">关 闭</el-button>
              </div>
          </el-dialog>
        </el-dialog>
        <!-- 已删除和草稿箱功能应要求暂不用实现，以备以后扩展之用 格式与方法同上-->
      </el-main>
  </div>
</template>
<script>
  export default {
    //   子组件里的数据
    data() {
      return {
        // 图片的展示方式
        fit: 'cover',
        // 图片地址
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569046668778&di=937128b7576c02e5b18f934807564bc0&imgtype=0&src=http%3A%2F%2F3766.peixun360.com%2FUploadFile%2Fimage%2F20171025%2F155516_3750.jpg',
        // 信箱存放
        mailBox: [{
            file: '收件箱',
            fileNum: 0,
            noReadFile: 0
          },
          {
            file: '草稿箱',
            fileNum: 0,
            noReadFile: 0
          },
          {
            file: '已发送',
            fileNum: 0,
            noReadFile: 0
          },
          {
            file: '已删除',
            fileNum: 0,
            noReadFile: 0
          }
        ],
        inboxInfo: [],//存放收件箱弹框中的数据
        sendedInfo: [],//存放已发送弹框中的数据
        messageDetail:[],//暂存收件箱和已发送点击列出的表格后详细信息中的数据，相当于一个中转站
        dialogInboxVisible: false,//收件箱的弹出框
        dialogSendedVisible: false,//已发送的弹出框 
        dialogMessageDetail: false,//收件箱点击列出的表格后详细信息弹出框 
        dialogSendedMessageDetail: false,//点击已发送出现消息详情弹出框
        newMessage: true,
        multipleSelection: [],//用来要删除的数据的数组
        
      }
    },
    // 钩子函数
    created(){
      this.getAllInboxInfo()//在页面加载之前将收件箱所有数据放到页面上
      this.getAllSendedInfo()//在页面加载之前将已发送所有数据放到页面上
    },
    // 方法
    methods: {
    // 获取邮箱数据
      getAllInboxInfo(){
        var datas = {
          "count":0
        }
        this.postRequest('/myoffice/message/countMessage',datas).then(resp => {
          this.mailBox[0].fileNum = resp.data.obj.listCount
        })
        this.postRequest('/myoffice/message/countNoRead',{}).then(resp => {
          this.mailBox[0].noReadFile = resp.data.obj.listCount
          // console.log(resp.data.obj)
        })
        this.postRequest('/myoffice/message/countAlreadyPublish',datas).then(resp => {
          this.mailBox[2].fileNum = resp.data.obj.listCount
        })
      },
    // 获取收件箱和已发送的数据信息 
      getAllSendedInfo() {
        this.postRequest('/myoffice/message/listMail',{}).then(resp => {
          if (resp.data && resp.data.status === 200) {
            this.inboxInfo = resp.data.obj.mailMessageList
          }
        })
        this.postRequest('/myoffice/message/listAlreadySend',{}).then(resp => {
          if (resp.data && resp.data.status === 200) {
            // console.log(resp.data.obj.mailMessageList)
            this.sendedInfo = resp.data.obj.mailMessageList
          }
        })
      },
    //  点击收件箱和发件箱出现弹框 
      showDetail(row) {
        if (row.file === '收件箱') {
          this.dialogInboxVisible = true
          this.getAllInboxInfo()

        } else if (row.file === '已发送') {
          this.dialogSendedVisible = true
          this.getAllSendedInfo()
        }
      },
    //  点击收件箱和发件箱出现弹框
      showMessageDetail(row) {
        var _this = this
        _this.dialogMessageDetail = true
        _this.messageDetail = row
        row.$style.color= "red"
        // console.log(_this.messageDetail)
        for (let i = 0; i < _this.inboxInfo.length; i++) {
          if (_this.inboxInfo[i].id === row.id) {
            _this.inboxInfo[i].newMessage = ''
          }
        }
        // console.log(_this.inboxInfo)
      },
    // 获取勾选所在哪一行的所有值，并且把每一行的数据放到一个数组里
      showSendedMessageDetail(row) {
        this.dialogSendedMessageDetail = true
        this.messageDetail = row
      },
    // 获取勾选状态下的复选框的哪一行的值，暂存在这个数组里 
      handleSelectionChange(val) {
        this.multipleSelection = val
        // console.log(this.multipleSelection)
      },
    //  删除收件信箱消息 
      deleteInboxMessage() {
        //该部分是在页面提示删除多少条数据
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>{
          var ids = []
          for (var i = 0; i < this.multipleSelection.length; i++) {
              ids.push(this.multipleSelection[i].messageId)
              }
          var datas ={
                "messageIds":ids
            }
            // console.log(datas.messageIds.length)
          var counts ={
              "count":datas.messageIds.length
          }
          console.log(count)
        // 更新文件个数
          this.postRequest('/myoffice/message/countMessage',counts).then(resp => {
            this.mailBox[0].fileNum = resp.data.obj.listCount
          })
        // 该部分是将数据从服务器删除，并且刷新桌面
        this.deleteRequest('/myoffice/message/deleteByMessageId', datas).then(resp => {
            this.tableLoading = false
            if (resp && resp.status === 200) {
                this.getAllInboxInfo()
                this.getAllSendedInfo()
                }
            })
            }).catch(() => {})
         },
    // 删除已发送消息
      deleteSendedMessage() {
        //该部分是在页面提示删除多少条数据
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = []
          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids.push(this.multipleSelection[i].messageId)
          }
          var datas ={
          "messageIds":ids
        }
        var counts ={
              "count":datas.messageIds.length
          }
          console.log(count)
        // 更新文件个数
          this.postRequest('/myoffice/message/countAlreadyPublish',counts).then(resp => {
            this.mailBox[2].fileNum = resp.data.obj.listCount
          })
        // console.log(datas)
        // 该部分是将数据从服务器删除，并且刷新桌面
          this.deleteRequest('/myoffice/message/deleteByMessageId', datas).then(resp => {
            this.tableLoading = false
            if (resp && resp.status === 200) {
              this.getAllInboxInfo()
              this.getAllSendedInfo()
            }
          })
        }).catch(() => {})
      },
      // 看完以后更新页面数据
      updata(){
        this.dialogMessageDetail = false
        console.log(this.messageDetail.id)
        var datas = {
          "id":this.messageDetail.id
        }
        this.postRequest('/myoffice/message/updateRead',datas).then(resp => {
          if (resp.data && resp.data.status === 200) {
            this.getAllInboxInfo()
          }
        })
      },
    }
  }
</script>
<style>
 .main{
   display: flex;
 }
 .main .left{
   flex: 3;
   width:30%
 }
 .main .right{
   flex: 7
 }
 .el-textarea.is-disabled .el-textarea__inner{
   color: red
 }
 .el-textarea__inner{
   width: 280%;
 }
</style>
