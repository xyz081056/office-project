<template>
  <div class="attendanceStatistic">
    <h1 style="font-size:30px">员工考勤统计</h1>
      <div class="header">
          <div class="header-bottom">
              <!-- 消息头下面部分左半边 -->
              <div class="header-left">
                  <el-form>
                      <el-form-item label="请输入查询考勤统计的时间段:" style="display:flex">
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
                  <!-- 对于单选按钮里:labal绑定的值会传给后，如果是字符串要加引号-->
                  <el-radio-group v-model="radio1" @change="search">
                      <el-radio :label="'本日'">本日</el-radio>
                      <el-radio :label="'本周'">本周</el-radio>
                      <el-radio :label="'本月'">本月</el-radio>
                  </el-radio-group>
              </div>
          </div>
      </div>
      <hr width="90%" />
      <div class="main">
          <el-form style="display:flex;margin:40px 0 0 8%">
               <el-form-item label="机构：" style="text-align:left;display:flex;margin-right:40px" >
                 <el-select v-model="branchName"
                    @change="getBranch($event)"
                    placeholder="请选择机构">
                    <el-option
                    v-for="item in branchNames"
                    :key="item.value"
                    :value="item.branchName">
                    </el-option>
                 </el-select>
                </el-form-item>
                <el-form-item label="部门：" style="text-align:left;display:flex;margin-right:40px" >
                    <el-select v-model="departName"
                        placeholder="请选择部门">
                        <el-option
                        v-for="item in departNames"
                        :key="item.value"
                        :value="item.departName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-col :span="6" style="display:flex;height:40px">
                    <el-button type="primary" style="margin-right:30px" @click="statistic">统计</el-button>
                    <el-button type="danger">导入Excel打印</el-button>
                </el-col>
        </el-form>
        <!-- 表格  -->
        <el-table
            v-if="flag"
            style="margin-top:30px"
            :data="tableDatas"
            border>
              <el-table-column
                  label="姓名"
                  fixed
                  align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="出勤率（%）"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.messageTypeName }}</span>
                      </template>
              </el-table-column>
              <el-table-column
                  label="迟到次数"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.username }}</span>
                      </template>
              </el-table-column>
              <el-table-column
                  label="早退次数"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.sendUser }}</span>
                      </template>
              </el-table-column>
              <el-table-column
                  label="旷工次数"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.beginTime }}</span>
                      </template>
              </el-table-column>
              <el-table-column
                  label="所属机构"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.endTime }}</span>
                      </template>
              </el-table-column>
              <el-table-column
                  label="所属部门"
                  align="center">
                      <template slot-scope="scope">
                          <span>{{ scope.row.recordTime }}</span>
                      </template>
              </el-table-column>
              <div slot="footer" class="table-footer">
                  <span>制表人：{{ tableDatas.maker}}</span>
                  <span>上报日期：{{tableDatas.date}}</span>
              </div>
          </el-table>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            radio1:'',
            dataRange:'',
            tableDatas:[],
            branchName:'',
            branchNames:[
                {branchName:'华北电力科学研究院'},
                {branchName:'中国科学院声学研究所'},
                {branchName:'北大青鸟集团'},
            ],
            departName:'',
            allDepart:[
                {branchName:'华北电力科学研究院',departName:'华北电力1'},{branchName:'华北电力科学研究院',departName:'华北电力2'},
                {branchName:'中国科学院声学研究所',departName:'声学研究所1'},{branchName:'中国科学院声学研究所',departName:'声学研究所2'},
                {branchName:'北大青鸟集团',departName:'青鸟集团1'},{branchName:'北大青鸟集团',departName:'青鸟集团2'},
            ],
            departNames:[],
            flag:false,
        }
    },
    methods:{
        //表单下拉框联动方法
        getBranch(val){
            console.log(val)
            let part=[]
            for (var a of this.allDepart){
                // console.log(a)
                if(val===a.branchName){
                    part.push({departName: a.departName})
                    console.log(part)
                }
                this.departNames = part
            }
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
                      this.tableDatas = res.data.obj.messageList;
                    //   console.log(this.messages)
                      this.$message({type: 'success', message: "查询成功！"});
                      }
                  })
                }else {
                    // this.getMessageInfo()
                }
              },
        search(){
            console.log(this.radio1)
        },
        statistic(){
            this.flag=true
        }
    }
}
</script>

<style>
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

</style>