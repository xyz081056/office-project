<template>
    <div>
      <h1 style="font-size:30px">员工考勤历史记录查询</h1>
      <div class="header">
          <div class="header-bottom">
              <!-- 消息头下面部分左半边 -->
              <div class="header-left">
                  <el-form>
                      <el-form-item label="请输入考勤历史查询的时间段:" style="display:flex">
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
                  <el-radio-group v-model="radio" @change="search">
                      <el-radio :label="'本日'">本日</el-radio>
                      <el-radio :label="'本周'">本周</el-radio>
                      <el-radio :label="'本月'">本月</el-radio>
                  </el-radio-group>
              </div>
        </div>
        <hr width="90%" />
        <!-- 筛选范围 -->
        <div class="screeningScope">
            <el-form  style="text-align:left" v-model="range" @change="test()">
                <el-form-item label="筛选范围：">
                    <el-checkbox-group v-model="checkbox" size="medium">
                        <el-checkbox :label="6" >按机构</el-checkbox>
                        <el-checkbox :label="7" >按部门</el-checkbox>
                        <el-checkbox :label="8" >按员工号</el-checkbox>
                        <el-checkbox :label="9" >按姓名</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <div style="display:flex;margin-left:20px">
                    <el-form-item label="机构：" style="display:flex" >
                        <el-select v-model="range.branchName"
                        :disabled=byBranch
                        v-on:change="getBranch($event)"
                        placeholder="请选择机构">
                        <el-option
                        v-for="item in branchNames"
                        :key="item.value"
                        :value="item.branchName">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门：" style="display:flex;margin-left:20px" >
                        <el-select v-model="range.departName"
                        :disabled=byDepart
                        placeholder="请选择部门">
                        <el-option
                        v-for="item in departNames"
                        :key="item.value"
                        :value="item.departName">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="员工号："  style="display:flex;margin-left:20px">
                        <el-input 
                        style="width:150px"
                        v-model="range.userId"
                        placeholder="请输入员工号"
                        :disabled=byId>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="姓名："  style="display:flex;margin-left:20px" >
                        <el-select
                        v-model="range.name"
                        multiple
                        filterable
                        remote
                        reserve-keyword
                        style="width:140px"
                        placeholder="请输入姓名"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option
                        v-for="item in names"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-button 
                @click="search"
                type="warning"
                style="margin-left:40%;width:150px">
                <i class="el-icon-search">搜索</i>
                </el-button>
            </el-form>
            <!-- 表格 -->
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
    </div>
</template>

<script>
export default {
    data(){
        return{
            dataRange:'',
            radio:'',
            tableDatas:[],
            checkbox:[],
            branchNames:[
                {branchName:'华北电力科学研究院'},
                {branchName:'中国科学院声学研究所'},
                {branchName:'北大青鸟集团'},
            ],
            allDepart:[
                {branchName:'华北电力科学研究院',departName:'华北电力1'},{branchName:'华北电力科学研究院',departName:'华北电力2'},
                {branchName:'中国科学院声学研究所',departName:'声学研究所1'},{branchName:'中国科学院声学研究所',departName:'声学研究所2'},
                {branchName:'北大青鸟集团',departName:'青鸟集团1'},{branchName:'北大青鸟集团',departName:'青鸟集团2'},
            ],
            departNames:[],
            names:[],
            loading:false,
            flag:false,
            byBranch:false,
            byDepart:false,
            byId:false,
            byName:false,
            range:{
                branchName:'',
                departName:'',
                userId:'',
                name:'',
            },
            list:[],
            // 以数组的形式接受所有的名字
            states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "许友宗"]
        }
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    methods:{
        // 模糊查询
        remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.names = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.names = [];
        }
      },
        // 下拉框联动
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
            this.flag = true
            console.log(this.radio)
        },
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