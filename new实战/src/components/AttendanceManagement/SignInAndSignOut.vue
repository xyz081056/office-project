<template>
    <!-- 该页面使用element-UI的Container布局 -->
    <div class="signInAndSignOut">
    <el-container>
    <el-header>
        <h1 style="font-size:30px">员工签到、签退</h1>
    </el-header>
    <el-main style="margin-top:20px">
        <fieldset style="padding:20px 0 0 50px">
            <legend align="left">员工签卡区</legend>
              <el-form :model="signInAndSignOut">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="签卡日期：" style="text-align:left">
                      <el-date-picker
                        v-model="signInAndSignOut.date"
                        type="date"
                        style="margin-left:20%;width:40%"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="text-align:left" >
                    <el-button type="primary" style="margin-right:10%">签到</el-button>
                    <el-button type="primary">签退</el-button>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="签卡备注:">
                            <el-input
                                  type="textarea"
                                  :rows="10"
                                  style="width:90%"
                                  placeholder="请输入备注"
                                  v-model="signInAndSignOut.remark">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
              </el-form>
            </fieldset>
    </el-main>
    </el-container>
    <hr style="margin-left:5%;" width="95%" />
    </div>
</template>

<script>
export default {
    data(){
        return{
            signInAndSignOut:{
                date:'',
                remark:'',
            },
        }
    },
    methods:{
        
    }
}
</script>

<style>
.signInAndSignOut .el-textarea__inner{
    width: 96%;
}
</style>